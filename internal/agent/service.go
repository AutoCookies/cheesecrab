package agent

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/llmclient"
)

// ChatRequest mirrors the OpenAI chat completions request shape in the
// fields that matter for the orchestrator. It is intentionally loose to
// avoid tight coupling to a specific schema.
type ChatRequest struct {
	Model    string          `json:"model"`
	Messages json.RawMessage `json:"messages"`
	Tools    json.RawMessage `json:"tools,omitempty"`
	// Additional OpenAI-style fields (temperature, etc.) are passed through.
	// They are preserved in raw form when forwarded to cheesebrain.
	Raw json.RawMessage `json:"-"`
}

// Service coordinates agentic handling of requests that require tools. It is
// intentionally thin for now but is the integration point for crabpath.
type Service struct {
	log *log.Logger
	llm llmclient.Client
	// cfg is reserved for future crabpath/tool configuration.
	cfg *config.Config
}

// NewService constructs a Service backed by the cheesebrain LLM client.
func NewService(cfg *config.Config, cheesebrainBaseURL string, logger *log.Logger) *Service {
	client := llmclient.NewHTTPClient(cheesebrainBaseURL)
	return &Service{
		log: logger,
		llm: client,
		cfg: cfg,
	}
}

// HandleAgenticChat is the primary hook used by the HTTP gateway when a
// request is deemed agentic. In the future this will spin up a crabpath
// agent with tool access; for now it delegates to the LLM client while
// preserving streaming behavior.
func (s *Service) HandleAgenticChat(ctx context.Context, req *ChatRequest, w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")

	// For now, simply forward the full raw body to cheesebrain via the LLM
	// client. This keeps behavior consistent while providing a single place
	// to introduce crabpath orchestration later.
	payload := any(req)

	respStream, err := s.llm.ChatCompletions(ctx, payload)
	if err != nil {
		return err
	}
	defer respStream.Close()

	_, err = io.Copy(w, respStream)
	return err
}

