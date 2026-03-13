// Package errtypes contains custom error types
package errtypes

import (
	"fmt"
	"strings"
)

const (
	UnknownKeyErrMsg     = "unknown key"
	InvalidModelNameErrMsg = "invalid model name"
)

// TODO: This should have a structured response from the API
type UnknownOllamaKey struct {
	Key string
}

func (e *UnknownOllamaKey) Error() string {
	return fmt.Sprintf("unauthorized: %s %q", UnknownKeyErrMsg, strings.TrimSpace(e.Key))
}
