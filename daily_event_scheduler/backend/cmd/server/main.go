package main

import (
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/api"
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/scheduler"
)

func main() {
	apiService := api.NewApiService()
	schedulerService := scheduler.NewSchedulerService()
	apiService.Register("/api/events", schedulerService.Router)
	apiService.Start()
}
