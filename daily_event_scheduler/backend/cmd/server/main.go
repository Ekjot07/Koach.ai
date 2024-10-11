package main

import (
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/api"
)

func main() {
	apiService := api.NewApiService()
	apiService.Start()
	// apiService.Register("/api/events",)
}
