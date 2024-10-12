package main

import (
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/scheduler"
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/api"
)

func main() {
	apiService := api.NewApiService()
	apiService.Start()
	schedulerService := scheduler.NewSchedulerService()
	apiService.Register("/api/events", schedulerService.Router())
}
