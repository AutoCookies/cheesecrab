//go:build !prod

// Package frontendui — development stub. Returns nil so the gateway falls
// back to serving files from disk (cfg.WebRoot / CHEESECRAB_WEB_ROOT).
package frontendui

import "io/fs"

// FS returns nil in development mode; the gateway serves from disk instead.
func FS() fs.FS { return nil }
