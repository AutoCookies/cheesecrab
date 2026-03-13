//go:build prod

// Package frontendui exposes the compiled Svelte web UI as an embedded file
// system. Build with -tags prod to activate embedding; without the tag the
// FS() function returns nil and the gateway falls back to serving from disk
// (useful for development — no rebuild required after frontend changes).
package frontendui

import (
	"embed"
	"io/fs"
)

//go:embed all:dist
var staticFS embed.FS

// FS returns the embedded frontend assets rooted at the dist/ directory.
func FS() fs.FS {
	sub, err := fs.Sub(staticFS, "dist")
	if err != nil {
		panic("frontendui: embed.FS sub failed: " + err.Error())
	}
	return sub
}
