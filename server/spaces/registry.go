package spaces

import (
	"github.com/gin-gonic/gin"
)

// Space defines the interface all modular spaces must implement
type Space interface {
	Name() string
	RegisterRoutes(router *gin.RouterGroup)
}

// Registry holds all registered spaces
type Registry struct {
	spaces map[string]Space
}

// NewRegistry creates a new Space registry
func NewRegistry() *Registry {
	return &Registry{
		spaces: make(map[string]Space),
	}
}

// Register adds a space to the registry
func (r *Registry) Register(s Space) {
	r.spaces[s.Name()] = s
}

// AttachRoutes attaches all registered spaces to the given router group
func (r *Registry) AttachRoutes(rg *gin.RouterGroup) {
	for name, space := range r.spaces {
		spaceGroup := rg.Group("/" + name)
		space.RegisterRoutes(spaceGroup)
	}
}

// List returns the names of all loaded spaces
func (r *Registry) List() []string {
	var names []string
	for name := range r.spaces {
		names = append(names, name)
	}
	return names
}
