package main

import (
	"bytes"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/AutoCookies/crabpath/agent"
	"github.com/AutoCookies/crabpath/callback"
	"github.com/AutoCookies/crabpath/llm"
	"github.com/AutoCookies/crabpath/memory"
	"github.com/AutoCookies/crabpath/tools"
)

func cheesebrainURL() string {
	if v := strings.TrimSpace(os.Getenv("CHEESEBRAIN_URL")); v != "" {
		return strings.TrimRight(v, "/")
	}
	return "http://127.0.0.1:8080"
}

func main() {
	fs := flag.NewFlagSet(os.Args[0], flag.ExitOnError)
	modelFlag := fs.String("model", strings.TrimSpace(os.Getenv("CHEESE_MODEL")), "LLM model id passed to cheese-server (empty = server default)")
	maxStepsFlag := fs.Int("max-steps", 0, "max agent steps (0 = from CHEESERAG_MAX_STEPS or defaults: 8 minimal, 20 full)")
	timeoutFlag := fs.Int("timeout", 0, "total run timeout seconds (0 = CHEESERAG_TIMEOUT_SEC or 120)")
	fullTools := fs.Bool("full-tools", false, "use full Cheesepath tool registry plus RAG (not minimal RAG-only)")
	autonomous := fs.Bool("autonomous", false, "enable autonomous app workflow mode (full tools + local_exec)")
	skipPreflight := fs.Bool("skip-preflight", false, "skip GET /health and /v1/models checks")
	rawLog := fs.Bool("raw-log", false, "use low-level crabchain logs instead of friendly terminal UI")
	reportPath := fs.String("report-json", "", "optional path to write run report JSON")
	statePath := fs.String("state-json", strings.TrimSpace(os.Getenv("CHEESERAG_STATE_JSON")), "optional path to write compact run state JSON")
	// New flags
	chatMode := fs.Bool("chat", false, "run interactive multi-turn REPL chat mode")
	outputFormat := fs.String("output-format", strings.TrimSpace(os.Getenv("CHEESERAG_OUTPUT_FORMAT")), "output format: text (default), json, markdown")
	continueFrom := fs.String("continue", strings.TrimSpace(os.Getenv("CHEESERAG_CONTINUE_STATE")), "path to a previous state JSON to resume from (prepends prior goal as context)")
	confirmDangerous := fs.Bool("confirm-dangerous", !isBoolEnv("CHEESERAG_AUTO_APPROVE"), "prompt [y/N] before executing dangerous tools (default true when TTY)")
	yesAll := fs.Bool("yes", isBoolEnv("CHEESERAG_YES"), "auto-approve all dangerous tool prompts (implies --confirm-dangerous=false)")
	quietStartup := fs.Bool("quiet-startup", false, "suppress preflight and startup banners")
	architect := fs.Bool("architect", false, "use design-first Architect strategy (forces implementation planning) [deprecated: use --strategy architect]")
	strategyFlag := fs.String("strategy", strings.TrimSpace(os.Getenv("CHEESERAG_STRATEGY")), "agent strategy: react (default), reflect, planexec, architect, fnagent")
	memoryFlag := fs.String("memory", strings.TrimSpace(os.Getenv("CHEESERAG_MEMORY")), "memory type: buffer (default), file, vector")
	metricsFlag := fs.Bool("metrics", false, "print token estimate, step count, and timing summary after each run")
	jsonLogFlag := fs.String("json-log", "", "path to write NDJSON event log (one JSON object per line per event)")

	fs.Usage = func() {
		fmt.Fprintf(fs.Output(), "Usage: %s [flags] <goal text>\n       %s --chat\n", os.Args[0], os.Args[0])
		fs.PrintDefaults()
	}
	_ = fs.Parse(os.Args[1:])
	goalArgs := fs.Args()
	userGoal := strings.Join(goalArgs, " ")

	autoApprove := *yesAll || !*confirmDangerous

	llmURL := cheesebrainURL()
	registryURL := strings.TrimSpace(os.Getenv("CHEESECRAB_REGISTRY_URL"))
	if registryURL == "" {
		registryURL = llmURL
	}
	minimalTools := !*fullTools && !*autonomous && os.Getenv("CHEESERAG_MINIMAL_TOOLS") != "0"
	enableExec := *autonomous || os.Getenv("CHEESERAG_ENABLE_EXEC") == "1"

	var reg *tools.Registry
	if *autonomous {
		reg = tools.NewRegistry()
		reg.Register(NewTaskBoundaryTool())
		reg.Register(NewNotifyUserTool())
		reg.Register(NewRAGRetrieveTool(ragFacadeURL()))
		reg.Register(NewRAGRetrieveCodeTool(ragFacadeURL()))
		reg.Register(tools.NewRunPythonTestTool())
		reg.Register(tools.NewRunGoTestTool())
		reg.Register(tools.NewRunLinterTool())
		reg.Register(wrap(NewLocalExecTool(), autoApprove))
		reg.Register(wrap(NewProcStartTool(), autoApprove))
		reg.Register(NewProcStatusTool())
		reg.Register(NewProcLogsTool())
		reg.Register(wrap(NewProcStopTool(), autoApprove))
		reg.Register(NewProcListTool())
		reg.Register(NewHTTPCheckTool())
		reg.Register(NewPortCheckTool())
		reg.Register(NewReadFileTool())
		reg.Register(wrap(NewWriteFileTool(), autoApprove))
		reg.Register(NewListDirTool())
		reg.Register(NewSearchFilesTool())
		reg.Register(NewGitContextTool())
		reg.Register(NewRAGIngestTool(ragFacadeURL()))
		reg.Register(wrap(NewBatchEditTool(), autoApprove))
	} else if minimalTools {
		reg = tools.NewRegistry()
		reg.Register(NewTaskBoundaryTool())
		reg.Register(NewNotifyUserTool())
		reg.Register(NewRAGRetrieveTool(ragFacadeURL()))
		reg.Register(NewRAGRetrieveCodeTool(ragFacadeURL()))
		reg.Register(tools.NewRunPythonTestTool())
		reg.Register(tools.NewRunGoTestTool())
		reg.Register(tools.NewRunLinterTool())
		if enableExec {
			reg.Register(wrap(NewLocalExecTool(), autoApprove))
			reg.Register(wrap(NewProcStartTool(), autoApprove))
			reg.Register(NewProcStatusTool())
			reg.Register(NewProcLogsTool())
			reg.Register(wrap(NewProcStopTool(), autoApprove))
			reg.Register(NewProcListTool())
			reg.Register(NewHTTPCheckTool())
			reg.Register(NewPortCheckTool())
		}
	} else {
		// Full-tools mode: start from a clean registry and manually compose the tool set,
		// mixing cheeserag-specific tools (with confirmation wrappers) and cheesepath extended tools.
		reg = tools.NewRegistry()
		reg.Register(NewTaskBoundaryTool())
		reg.Register(NewNotifyUserTool())
		reg.Register(NewRAGRetrieveTool(ragFacadeURL()))
		reg.Register(NewRAGRetrieveCodeTool(ragFacadeURL()))
		reg.Register(tools.NewRunPythonTestTool())
		reg.Register(tools.NewRunGoTestTool())
		reg.Register(tools.NewRunLinterTool())
		reg.Register(NewReadFileTool())
		reg.Register(wrap(NewWriteFileTool(), autoApprove))
		reg.Register(NewListDirTool())
		reg.Register(NewSearchFilesTool())
		reg.Register(NewGitContextTool())
		reg.Register(&EnvTool{})
		reg.Register(&ProcessTool{})
		// Cheesepath extended tools
		reg.Register(tools.NewDiffFilesTool())
		reg.Register(tools.NewGrepInFilesTool())
		reg.Register(tools.NewJSONQueryTool())
		reg.Register(tools.NewWebFetchTool())
		reg.Register(NewRAGIngestTool(ragFacadeURL()))
		reg.Register(wrap(NewBatchEditTool(), autoApprove))
		if enableExec {
			reg.Register(wrap(NewLocalExecTool(), autoApprove))
			reg.Register(wrap(NewProcStartTool(), autoApprove))
			reg.Register(NewProcStatusTool())
			reg.Register(NewProcLogsTool())
			reg.Register(wrap(NewProcStopTool(), autoApprove))
			reg.Register(NewProcListTool())
			reg.Register(NewHTTPCheckTool())
			reg.Register(NewPortCheckTool())
		}
	}

	maxSteps := 20
	if *maxStepsFlag > 0 {
		maxSteps = *maxStepsFlag
	} else if v := strings.TrimSpace(os.Getenv("CHEESERAG_MAX_STEPS")); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			maxSteps = n
		}
	} else if *autonomous {
		maxSteps = 30
	} else if minimalTools {
		maxSteps = 8
	}
	timeoutSec := 120
	if *timeoutFlag > 0 {
		timeoutSec = *timeoutFlag
	} else if v := strings.TrimSpace(os.Getenv("CHEESERAG_TIMEOUT_SEC")); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			timeoutSec = n
		}
	} else if *autonomous {
		timeoutSec = 300
	}

	client := llm.NewClient(llmURL)

	// Register client-dependent tools now that client is available.
	// sub_agent and critic_review need the LLM client; web_search is standalone.
	reg.Register(NewWebSearchTool(5))
	reg.Register(NewCriticReviewTool(client, strings.TrimSpace(*modelFlag)))
	if *autonomous || *fullTools {
		reg.Register(NewSubAgentTool(client, reg, strings.TrimSpace(*modelFlag), maxSteps))
	}

	var metricsHandler *callback.MetricsHandler
	var handler callback.Handler
	if *rawLog {
		handler = callback.NewLogHandler(os.Stdout)
	} else {
		ui := NewTerminalUIHandler(os.Stdout)
		if *quietStartup {
			ui.Quiet = true
		}
		handler = ui
	}
	if *metricsFlag {
		metricsHandler = callback.NewMetricsHandler()
		handler = callback.MultiHandler{handler, metricsHandler}
	}
	if jl := strings.TrimSpace(*jsonLogFlag); jl != "" {
		f, err := os.OpenFile(jl, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o644)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[cheese] warning: cannot open json-log %s: %v\n", jl, err)
		} else {
			handler = callback.MultiHandler{handler, callback.NewJSONLogHandler(f)}
		}
	}

	// Resolve strategy: --strategy flag takes precedence over legacy --architect.
	stratName := strings.ToLower(strings.TrimSpace(*strategyFlag))
	if stratName == "" && *architect {
		stratName = "architect"
	}
	strat := pickStrategy(stratName)

	// Resolve memory type from --memory flag.
	mem := buildMemory(*memoryFlag, client)

	opts := []agent.ExecutorOption{
		agent.WithStrategy(strat),
		agent.WithMemory(mem),
		agent.WithCallbacks(handler),
		agent.WithMaxSteps(maxSteps),
	}
	if strings.TrimSpace(*modelFlag) != "" {
		opts = append(opts, agent.WithModel(strings.TrimSpace(*modelFlag)))
	}
	executor := agent.NewExecutor(client, reg, opts...)

	// Build goal prefix
	goalPrefix := ""
	if p := strings.TrimSpace(os.Getenv("CHEESERAG_GOAL_PREFIX")); p != "" {
		goalPrefix = p
	} else if minimalTools {
		goalPrefix = "RAG & Tool Guidance:\n" +
			"- Decide if you need tools. For greetings, general chat, or basic logic, answer DIRECTLY without tools.\n" +
			"- CRITICAL: To ANSWER QUESTIONS based on the database or ingested documents, ALWAYS use the rag_retrieve tool.\n" +
			"- CRITICAL: To SEARCH THE CODEBASE semantically (e.g. finding functions, logic), ALWAYS use the rag_retrieve_code tool.\n" +
			"- Use the JSON field \"query\" for tool arguments (matching the user's question, not literal placeholders).\n" +
			"- If a tool tells you something is missing, stop searching and inform the user."
	} else if *autonomous {
		goalPrefix = "Autonomous execution mode:\n" +
			"- Prefer using tools to execute and verify tasks, not just reasoning.\n" +
			"- Use local_exec for running app/dev commands and inspect outputs.\n" +
			"- Use read_file/write_file/list_dir/search_files for filesystem access.\n" +
			"- Use git_context to understand the repo state before making changes.\n" +
			"- Use proc_start/proc_status/proc_logs/proc_stop/proc_list for long-running services.\n" +
			"- Verify in this order: port_check first, then http_check.\n" +
			"- If a check fails, inspect logs/status and retry once with corrected args.\n" +
			"- Iterate until goal is actually complete, then return final_answer with concrete results."
	} else {
		goalPrefix = "You have access to filesystem tools (read_file, write_file, list_dir, search_files) " +
			"and git_context to understand and modify the codebase. Use them proactively."
	}
	
	goalPrefix += ambientWorkspaceContext()

	// --continue: prepend prior goal/answer as context.
	if *continueFrom != "" {
		if prior, err := loadPriorState(*continueFrom); err == nil {
			if prior.UserGoal != "" && goalPrefix != "" {
				goalPrefix += "\n\nPrior session context: " + prior.UserGoal
			}
		} else {
			fmt.Fprintf(os.Stderr, "warning: could not load --continue state: %v\n", err)
		}
	}

	// Chat mode
	if *chatMode {
		requirePreflight := minimalTools || os.Getenv("CHEESERAG_PREFLIGHT") == "1"
		if !*skipPreflight && os.Getenv("CHEESERAG_SKIP_PREFLIGHT") != "1" && requirePreflight {
			if err := preflightRAG(context.Background(), llmURL, ragFacadeURL()); err != nil {
				fmt.Fprintf(os.Stderr, "preflight failed: %v\n(set -skip-preflight or CHEESERAG_SKIP_PREFLIGHT=1 to bypass)\n", err)
				os.Exit(1)
			}
		}
		runChatMode(executor, goalPrefix, timeoutSec)
		return
	}

	// Single-shot mode
	goal := userGoal
	if goalPrefix != "" {
		if goal != "" {
			goal = goalPrefix + "\n\n" + goal
		} else {
			goal = goalPrefix
		}
	}
	if strings.TrimSpace(goal) == "" {
		fs.Usage()
		os.Exit(2)
	}

	_ = os.Setenv("CHEESERAG_USER_GOAL", userGoal)

	// SIGINT / SIGTERM → cancel context, print partial answer.
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeoutSec)*time.Second)
	defer cancel()
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-sigCh
		fmt.Fprintln(os.Stderr, "\n[interrupted — cancelling run]")
		cancel()
	}()

	requirePreflight := minimalTools || os.Getenv("CHEESERAG_PREFLIGHT") == "1"
	if !*skipPreflight && os.Getenv("CHEESERAG_SKIP_PREFLIGHT") != "1" && requirePreflight {
		if err := preflightRAG(ctx, llmURL, ragFacadeURL()); err != nil {
			fmt.Fprintf(os.Stderr, "preflight failed: %v\n(set -skip-preflight or CHEESERAG_SKIP_PREFLIGHT=1 to bypass)\n", err)
			os.Exit(1)
		}
	}

	events, path := executor.Run(ctx, goal)
	for ev := range events {
		if ev.Type == agent.EventFinalAnswer {
			if s, ok := ev.Payload.(string); ok {
				printFinalAnswer(s, *outputFormat)
			}
		}
	}
	steps := len(path.Steps)
	toolCalls := 0
	for _, st := range path.Steps {
		toolCalls += len(st.ToolCalls)
	}
	dur := time.Since(path.StartedAt)
	if path.EndedAt != nil {
		dur = path.EndedAt.Sub(path.StartedAt)
	}
	fmt.Printf("\nRun summary: status=%s steps=%d tool_calls=%d duration=%s\n",
		path.Status, steps, toolCalls, dur.Round(time.Millisecond))
	if metricsHandler != nil {
		m := metricsHandler.Snapshot()
		fmt.Printf("Metrics:     tokens≈%d tool_calls=%d total_duration=%s\n",
			m.TotalTokens, m.ToolCallCount, m.TotalDuration.Round(time.Millisecond))
	}
	if rp := strings.TrimSpace(*reportPath); rp != "" {
		if err := writeRunReport(rp, path, dur, userGoal); err != nil {
			fmt.Fprintf(os.Stderr, "report write failed: %v\n", err)
		} else {
			fmt.Printf("Report: %s\n", rp)
		}
	}
	if sp := strings.TrimSpace(*statePath); sp != "" {
		if err := writeRunState(sp, path, dur, userGoal); err != nil {
			fmt.Fprintf(os.Stderr, "state write failed: %v\n", err)
		} else {
			fmt.Printf("State: %s\n", sp)
		}
	}
	if path.Status != agent.PathCompleted {
		for _, st := range path.Steps {
			for _, tc := range st.ToolCalls {
				if strings.TrimSpace(tc.Error) != "" {
					fmt.Fprintf(os.Stderr, "step=%d tool=%s error=%s\n", st.Index, tc.ToolName, tc.Error)
				}
			}
		}
		if strings.TrimSpace(path.Answer) != "" {
			printFinalAnswer(path.Answer, *outputFormat)
		} else {
			fmt.Fprintln(os.Stderr, "No final answer: model did not emit is_final/final_answer or ran out of steps.")
		}
	}
}

// wrap applies ConfirmingTool to dangerous tools.
func wrap(t Tool, autoApprove bool) Tool {
	return WrapWithConfirm(t, autoApprove)
}

// printFinalAnswer renders the answer in the requested format.
func printFinalAnswer(answer, format string) {
	switch strings.ToLower(strings.TrimSpace(format)) {
	case "json":
		b, _ := json.Marshal(map[string]string{"answer": answer})
		fmt.Println("\nAnswer:", string(b))
	case "markdown":
		fmt.Printf("\n## Answer\n\n%s\n", answer)
	default:
		fmt.Println("\nAnswer:", answer)
	}
}

// isBoolEnv returns true if the env var is "1", "true", "yes".
func isBoolEnv(key string) bool {
	v := strings.TrimSpace(strings.ToLower(os.Getenv(key)))
	return v == "1" || v == "true" || v == "yes"
}

// priorState minimal shape from a state JSON produced by writeRunState.
type priorState struct {
	UserGoal string `json:"user_goal"`
	Answer   string `json:"answer"`
	Status   string `json:"status"`
}

func loadPriorState(path string) (*priorState, error) {
	raw, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var s priorState
	if err := json.Unmarshal(raw, &s); err != nil {
		return nil, err
	}
	return &s, nil
}

func writeRunReport(path string, p *agent.CrabPath, dur time.Duration, userGoal string) error {
	out := map[string]any{
		"id":          p.ID,
		"user_goal":   userGoal,
		"status":      p.Status,
		"started_at":  p.StartedAt,
		"ended_at":    p.EndedAt,
		"duration_ms": dur.Milliseconds(),
		"steps":       p.Steps,
		"answer":      p.Answer,
	}
	b, err := json.MarshalIndent(out, "", "  ")
	if err != nil {
		return err
	}
	if dir := filepath.Dir(path); strings.TrimSpace(dir) != "" && dir != "." {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return err
		}
	}
	return os.WriteFile(path, b, 0o644)
}

func writeRunState(path string, p *agent.CrabPath, dur time.Duration, userGoal string) error {
	lastError := ""
	lastTool := ""
	firstTool := ""
	successfulToolCalls := 0
	failedToolCalls := 0
	forcedPathUsed := false
	observedIntent := inferObservedIntent(userGoal)
	deterministicAutonomous := deterministicAutonomousEnabled()
	for _, st := range p.Steps {
		if strings.Contains(strings.ToLower(st.Thought.Reasoning), "auto execution injected by executor") ||
			strings.Contains(strings.ToLower(st.Thought.Reasoning), "auto verification injected by executor") {
			forcedPathUsed = true
		}
		for _, tc := range st.ToolCalls {
			if firstTool == "" && strings.TrimSpace(tc.ToolName) != "" {
				firstTool = tc.ToolName
			}
			if strings.TrimSpace(tc.ToolName) != "" {
				lastTool = tc.ToolName
			}
			if strings.TrimSpace(tc.Error) != "" {
				lastError = tc.Error
				failedToolCalls++
			} else if strings.TrimSpace(tc.Result) != "" {
				successfulToolCalls++
			}
		}
	}
	stopReason := inferStopReason(p, failedToolCalls)
	out := map[string]any{
		"state_schema_version":     1,
		"id":                       p.ID,
		"user_goal":                userGoal,
		"status":                   p.Status,
		"duration_ms":              dur.Milliseconds(),
		"steps":                    len(p.Steps),
		"answer":                   p.Answer,
		"stop_reason":              stopReason,
		"first_tool":               firstTool,
		"last_error":               lastError,
		"last_tool":                lastTool,
		"successful_tool_calls":    successfulToolCalls,
		"failed_tool_calls":        failedToolCalls,
		"observed_intent":          observedIntent,
		"deterministic_autonomous": deterministicAutonomous,
		"forced_path_used":         forcedPathUsed,
		"updated_at":               time.Now().UTC().Format(time.RFC3339),
	}
	b, err := json.MarshalIndent(out, "", "  ")
	if err != nil {
		return err
	}
	if dir := filepath.Dir(path); strings.TrimSpace(dir) != "" && dir != "." {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return err
		}
	}
	return os.WriteFile(path, b, 0o644)
}

func deterministicAutonomousEnabled() bool {
	v := strings.TrimSpace(strings.ToLower(os.Getenv("CHEESERAG_DETERMINISTIC_AUTONOMOUS")))
	return v == "" || v == "1" || v == "true" || v == "yes" || v == "on"
}

func inferObservedIntent(goal string) string {
	g := strings.ToLower(strings.TrimSpace(goal))
	switch {
	case strings.Contains(g, "http://") || strings.Contains(g, "https://") || strings.Contains(g, "health") || strings.Contains(g, "endpoint"):
		return "http_check"
	case strings.Contains(g, "go test") || strings.Contains(g, "run tests"):
		return "run_tests"
	case strings.Contains(g, "read file") || strings.Contains(g, "show file") || strings.Contains(g, "tail log") || strings.Contains(g, "list files") ||
		strings.Contains(g, "git status") || strings.Contains(g, "git diff") || strings.Contains(g, "pwd") || strings.Contains(g, "working directory"):
		return "readonly"
	case strings.Contains(g, "write") || strings.Contains(g, "edit") || strings.Contains(g, "create file") || strings.Contains(g, "modify"):
		return "file_edit"
	default:
		return "general"
	}
}

func inferStopReason(p *agent.CrabPath, failedToolCalls int) string {
	switch p.Status {
	case agent.PathCompleted:
		return "completed"
	case agent.PathAborted:
		return "timeout_or_cancellation"
	case agent.PathFailed:
		if failedToolCalls > 0 {
			return "tool_errors"
		}
		if strings.TrimSpace(p.Answer) != "" {
			return "max_steps_or_nonfinal_model_output"
		}
		return "model_or_runtime_failure"
	default:
		return "unknown"
	}
}

func ambientWorkspaceContext() string {
	cmd := exec.Command("git", "status", "-s")
	out, err := cmd.Output()
	if err != nil || len(strings.TrimSpace(string(out))) == 0 {
		return ""
	}
	return "\n\n[Active Workspace Context - Uncommitted Changes]\n" + string(out) + "\n"
}

// buildMemory constructs the appropriate Memory implementation from the flag value.
func buildMemory(memType string, client *llm.Client) memory.Memory {
	switch strings.ToLower(strings.TrimSpace(memType)) {
	case "file":
		m, err := memory.NewFileMemory(".cheeserag_memory.json")
		if err != nil {
			fmt.Fprintf(os.Stderr, "[cheese] warning: could not open file memory: %v; falling back to buffer\n", err)
			return memory.NewBufferMemory()
		}
		return m
	case "vector":
		embedFn := makeEmbedFunc(client)
		return memory.NewVectorMemory(embedFn, 4096)
	default:
		return memory.NewBufferMemory()
	}
}

// makeEmbedFunc returns an EmbedFunc that calls Cheesebrain's /v1/embeddings endpoint.
func makeEmbedFunc(client *llm.Client) memory.EmbedFunc {
	baseURL := strings.TrimRight(cheesebrainURL(), "/")
	httpClient := &http.Client{Timeout: 10 * time.Second}

	return func(text string) ([]float32, error) {
		payload := map[string]any{"input": text}
		b, err := json.Marshal(payload)
		if err != nil {
			return nil, err
		}
		req, err := http.NewRequest(http.MethodPost, baseURL+"/v1/embeddings", bytes.NewReader(b))
		if err != nil {
			return nil, err
		}
		req.Header.Set("Content-Type", "application/json")
		resp, err := httpClient.Do(req)
		if err != nil {
			return nil, err
		}
		defer resp.Body.Close()
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return nil, err
		}
		var result struct {
			Data []struct {
				Embedding []float32 `json:"embedding"`
			} `json:"data"`
		}
		if err := json.Unmarshal(body, &result); err != nil {
			return nil, err
		}
		if len(result.Data) == 0 || len(result.Data[0].Embedding) == 0 {
			return nil, fmt.Errorf("embeddings endpoint returned empty embedding")
		}
		_ = client // referenced to avoid unused import if client is only used here
		return result.Data[0].Embedding, nil
	}
}
