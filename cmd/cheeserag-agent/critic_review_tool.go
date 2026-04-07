package main

import (
	"context"
	"fmt"
	"strings"

	"github.com/AutoCookies/crabpath/llm"
)

// CriticReviewTool makes a direct LLM call with a strict critic system prompt
// to review code or text and return actionable feedback.
type CriticReviewTool struct {
	client *llm.Client
	model  string
}

func NewCriticReviewTool(client *llm.Client, model string) *CriticReviewTool {
	return &CriticReviewTool{client: client, model: model}
}

func (t *CriticReviewTool) Name() string    { return "critic_review" }
func (t *CriticReviewTool) Dangerous() bool { return false }
func (t *CriticReviewTool) Description() string {
	return "Submit code or text to a strict critic LLM for quality review. " +
		"Returns specific bugs, logic errors, security issues, and improvement suggestions. " +
		"Use this to verify your own work before finalizing."
}
func (t *CriticReviewTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"content": map[string]any{
				"type":        "string",
				"description": "The code or text to review",
			},
			"focus": map[string]any{
				"type":        "string",
				"description": "Review focus area: code (default), logic, security, text",
				"enum":        []string{"code", "logic", "security", "text"},
			},
		},
		"required": []string{"content"},
	}
}

func (t *CriticReviewTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	content, _ := args["content"].(string)
	if content == "" {
		return "", fmt.Errorf("critic_review: content is required")
	}

	focus, _ := args["focus"].(string)
	systemPrompt := buildCriticPrompt(focus)

	resp, err := t.client.Complete(ctx, llm.Request{
		Model: t.model,
		Messages: []llm.Message{
			{Role: "system", Content: systemPrompt},
			{Role: "user", Content: "Review the following:\n\n" + content},
		},
	})
	if err != nil {
		return "", fmt.Errorf("critic_review: LLM call failed: %w", err)
	}

	return strings.TrimSpace(resp), nil
}

func buildCriticPrompt(focus string) string {
	base := `You are a strict, uncompromising code and logic reviewer.
Your job is to find problems, not to praise. Be specific and concise.
For each issue: state the problem, its location, and the fix.
Do not say "looks good" unless everything is genuinely correct.`

	switch strings.ToLower(strings.TrimSpace(focus)) {
	case "security":
		return base + `

FOCUS: Security review.
Look for: injection vulnerabilities (SQL, shell, XSS), authentication bypasses,
hardcoded secrets, insecure deserialization, race conditions, path traversal,
unvalidated inputs, and OWASP Top 10 issues.`

	case "logic":
		return base + `

FOCUS: Logic and correctness review.
Look for: off-by-one errors, incorrect boundary conditions, wrong operator precedence,
unreachable code, infinite loops, incorrect error handling, missing edge cases,
and logical contradictions.`

	case "text":
		return base + `

FOCUS: Text quality review.
Look for: unclear or ambiguous sentences, factual errors, inconsistent terminology,
missing context, logical gaps, and structural issues that reduce comprehension.`

	default: // "code" and default
		return base + `

FOCUS: Code quality review.
Look for: bugs, undefined behavior, resource leaks (unclosed files, goroutines),
error handling omissions, inefficient algorithms, naming issues, and maintainability problems.`
	}
}
