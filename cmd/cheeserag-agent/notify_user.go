package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"strings"
)

type NotifyUserTool struct{}

func NewNotifyUserTool() *NotifyUserTool {
	return &NotifyUserTool{}
}

func (t *NotifyUserTool) Name() string { return "notify_user" }

func (t *NotifyUserTool) Description() string {
	return "Use this tool to ask the user a question, request architectural decisions, or demand approval before executing dangerous operations."
}

func (t *NotifyUserTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"Message": map[string]any{"type": "string", "description": "The message to show the user."},
		},
		"required": []string{"Message"},
	}
}

func (t *NotifyUserTool) Dangerous() bool { return false }

func (t *NotifyUserTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	msg, ok := args["Message"].(string)
	if !ok {
		return "", fmt.Errorf("missing Message argument")
	}

	fmt.Printf("\n\n\x1b[35m[Agent requires your input]\x1b[0m\n%s\n\x1b[38;5;214myour response>\x1b[0m ", msg)
	
	// Temporarily bypass raw terminal modes if stty was used
	reader := bufio.NewReader(os.Stdin)
	response, err := reader.ReadString('\n')
	if err != nil {
		return "", err
	}
	
	return strings.TrimSpace(response), nil
}
