package utils

import (
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
)

type SysHealth struct {
	CPUUsagePercent float64 `json:"cpu_usage_percent"`
	TotalRAMGB      float64 `json:"total_ram_gb"`
	FreeRAMGB       float64 `json:"free_ram_gb"`
	UsedRAMPercent  float64 `json:"used_ram_percent"`
}

func GetSysHealth() (*SysHealth, error) {
	v, err := mem.VirtualMemory()
	if err != nil {
		return nil, err
	}
	
	c, err := cpu.Percent(0, false)
	if err != nil || len(c) == 0 {
		return nil, err
	}

	return &SysHealth{
		CPUUsagePercent: c[0],
		TotalRAMGB:      float64(v.Total) / 1024 / 1024 / 1024,
		FreeRAMGB:       float64(v.Available) / 1024 / 1024 / 1024,
		UsedRAMPercent:  v.UsedPercent,
	}, nil
}
