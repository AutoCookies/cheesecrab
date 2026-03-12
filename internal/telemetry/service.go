package telemetry

import (
	"bufio"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/AutoCookies/cheesecrab/internal/process/cheesebrain"
	"github.com/gorilla/websocket"
)

// TelemetrySnapshot represents a point-in-time view of system and engine
// health that is broadcast to WebSocket clients and used by /healthz.
type TelemetrySnapshot struct {
	Timestamp time.Time `json:"timestamp"`

	CPUPercent    float64 `json:"cpu_percent"`
	MemTotalBytes uint64  `json:"mem_total_bytes"`
	MemUsedBytes  uint64  `json:"mem_used_bytes"`
	MemFreeBytes  uint64  `json:"mem_free_bytes"`

	EngineState   string `json:"engine_state"`
	EngineModel   string `json:"engine_model,omitempty"`
	EngineMessage string `json:"engine_message,omitempty"`
}

// Service aggregates metrics and engine state and fans them out to
// subscribers over WebSocket.
type Service struct {
	log *log.Logger

	mu       sync.RWMutex
	snapshot TelemetrySnapshot

	cpuPrevIdle  uint64
	cpuPrevTotal uint64
	cpuInit      bool

	hub *hub
}

// NewService creates and starts a TelemetryService. It launches background
// goroutines tied to the provided context for system metrics collection,
// engine event processing, and WebSocket broadcasting.
func NewService(ctx context.Context, logger *log.Logger, engineEvents <-chan cheesebrain.EngineEvent) *Service {
	s := &Service{
		log: logger,
		snapshot: TelemetrySnapshot{
			Timestamp:    time.Now(),
			EngineState:  "starting",
			EngineModel:  "",
			EngineMessage: "",
		},
		hub: newHub(logger),
	}

	go s.hub.run(ctx)
	go s.runSystemCollector(ctx)
	go s.runEngineListener(ctx, engineEvents)
	go s.runBroadcaster(ctx)

	return s
}

// GetSnapshot returns a copy of the most recent telemetry snapshot.
func (s *Service) GetSnapshot() TelemetrySnapshot {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.snapshot
}

// HandleWebSocket upgrades the connection and registers a new telemetry client.
func (s *Service) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			// Local-only deployment; allow all origins. This can be
			// tightened if exposed beyond localhost.
			return true
		},
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		s.log.Printf("telemetry websocket upgrade failed: %v", err)
		return
	}

	client := &client{
		conn: conn,
		send: make(chan []byte, 8),
	}
	s.hub.register <- client

	go client.writePump(s.log, s.hub.unregister)
	go client.readPump(s.log, s.hub.unregister)
}

func (s *Service) runSystemCollector(ctx context.Context) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			now := time.Now()

			idle, total, err := readCPUStat()
			if err != nil {
				s.log.Printf("telemetry cpu read error: %v", err)
			}

			var cpuPercent float64
			s.mu.Lock()
			if !s.cpuInit {
				s.cpuInit = true
			} else if total > s.cpuPrevTotal {
				idleDelta := float64(idle - s.cpuPrevIdle)
				totalDelta := float64(total - s.cpuPrevTotal)
				if totalDelta > 0 {
					cpuPercent = 100 * (1 - idleDelta/totalDelta)
				}
			}
			s.cpuPrevIdle = idle
			s.cpuPrevTotal = total
			s.snapshot.Timestamp = now
			if cpuPercent >= 0 {
				s.snapshot.CPUPercent = cpuPercent
			}

			mt, mu, ma, err := readMemInfo()
			if err != nil {
				s.log.Printf("telemetry mem read error: %v", err)
			} else {
				s.snapshot.MemTotalBytes = mt
				s.snapshot.MemUsedBytes = mu
				s.snapshot.MemFreeBytes = ma
			}
			s.mu.Unlock()
		}
	}
}

// readCPUStat reads /proc/stat and returns idle and total jiffies for CPU0+.
func readCPUStat() (idle, total uint64, err error) {
	f, err := os.Open("/proc/stat")
	if err != nil {
		return 0, 0, err
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		fields := strings.Fields(scanner.Text())
		if len(fields) == 0 {
			continue
		}
		if fields[0] != "cpu" {
			continue
		}
		var vals []uint64
		for _, f := range fields[1:] {
			v, e := strconv.ParseUint(f, 10, 64)
			if e != nil {
				return 0, 0, e
			}
			vals = append(vals, v)
		}
		if len(vals) < 4 {
			return 0, 0, nil
		}
		for _, v := range vals {
			total += v
		}
		// idle + iowait
		idle = vals[3]
		if len(vals) > 4 {
			idle += vals[4]
		}
		return idle, total, nil
	}
	if err := scanner.Err(); err != nil {
		return 0, 0, err
	}
	return 0, 0, nil
}

// readMemInfo reads /proc/meminfo and returns total, used, available bytes.
func readMemInfo() (total, used, available uint64, err error) {
	f, err := os.Open("/proc/meminfo")
	if err != nil {
		return 0, 0, 0, err
	}
	defer f.Close()

	var memTotal, memAvailable uint64

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "MemTotal:") {
			memTotal, err = parseMeminfoLine(line)
			if err != nil {
				return 0, 0, 0, err
			}
		} else if strings.HasPrefix(line, "MemAvailable:") {
			memAvailable, err = parseMeminfoLine(line)
			if err != nil {
				return 0, 0, 0, err
			}
		}
	}
	if err := scanner.Err(); err != nil {
		return 0, 0, 0, err
	}

	if memTotal == 0 {
		return 0, 0, 0, nil
	}
	memUsed := memTotal - memAvailable
	return memTotal, memUsed, memAvailable, nil
}

func parseMeminfoLine(line string) (uint64, error) {
	parts := strings.Fields(line)
	if len(parts) < 2 {
		return 0, nil
	}
	// Value is in kB.
	kb, err := strconv.ParseUint(parts[1], 10, 64)
	if err != nil {
		return 0, err
	}
	return kb * 1024, nil
}

func (s *Service) runEngineListener(ctx context.Context, events <-chan cheesebrain.EngineEvent) {
	for {
		select {
		case <-ctx.Done():
			return
		case ev, ok := <-events:
			if !ok {
				return
			}
			s.mu.Lock()
			if ev.Time.IsZero() {
				ev.Time = time.Now()
			}
			s.snapshot.Timestamp = ev.Time
			if ev.State != "" {
				s.snapshot.EngineState = ev.State
			}
			if ev.Model != "" {
				s.snapshot.EngineModel = ev.Model
			}
			if ev.Message != "" {
				s.snapshot.EngineMessage = ev.Message
			}
			s.mu.Unlock()
		}
	}
}

func (s *Service) runBroadcaster(ctx context.Context) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			snap := s.GetSnapshot()
			data, err := json.Marshal(snap)
			if err != nil {
				s.log.Printf("telemetry marshal error: %v", err)
				continue
			}
			s.hub.broadcast <- data
		}
	}
}

// EngineEvent is re-exported for consumers that may want to synthesize events.
// In most cases, callers should use the events generated by the process
// manager in internal/process/cheesebrain.

// hub coordinates WebSocket clients.
type hub struct {
	log *log.Logger

	register   chan *client
	unregister chan *client
	broadcast  chan []byte

	mu      sync.Mutex
	clients map[*client]struct{}
}

func newHub(logger *log.Logger) *hub {
	return &hub{
		log:        logger,
		register:   make(chan *client),
		unregister: make(chan *client),
		broadcast:  make(chan []byte, 16),
		clients:    make(map[*client]struct{}),
	}
}

func (h *hub) run(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			h.mu.Lock()
			for c := range h.clients {
				_ = c.conn.Close()
				delete(h.clients, c)
			}
			h.mu.Unlock()
			return
		case c := <-h.register:
			h.mu.Lock()
			h.clients[c] = struct{}{}
			h.mu.Unlock()
		case c := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[c]; ok {
				delete(h.clients, c)
				close(c.send)
				_ = c.conn.Close()
			}
			h.mu.Unlock()
		case msg := <-h.broadcast:
			h.mu.Lock()
			for c := range h.clients {
				select {
				case c.send <- msg:
				default:
					// Drop slow clients.
				}
			}
			h.mu.Unlock()
		}
	}
}

type client struct {
	conn *websocket.Conn
	send chan []byte
}

func (c *client) writePump(log *log.Logger, unregister chan<- *client) {
	defer func() {
		unregister <- c
	}()

	for msg := range c.send {
		_ = c.conn.SetWriteDeadline(time.Now().Add(5 * time.Second))
		if err := c.conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			log.Printf("telemetry websocket write error: %v", err)
			return
		}
	}
}

func (c *client) readPump(log *log.Logger, unregister chan<- *client) {
	defer func() {
		unregister <- c
	}()

	c.conn.SetReadLimit(1024)
	_ = c.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.conn.SetPongHandler(func(string) error {
		return c.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	})

	for {
		if _, _, err := c.conn.ReadMessage(); err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("telemetry websocket read error: %v", err)
			}
			return
		}
	}
}

