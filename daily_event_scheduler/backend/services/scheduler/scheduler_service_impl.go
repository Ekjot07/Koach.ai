package scheduler

import (
	"encoding/json"
	"net/http"

	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/scheduler"
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/domains"
)

type SchedulerService struct {
	schedulerInternal scheduler.ISchedulerInternal
}

func NewSchedulerService() ISchedulerAPI {
	return &SchedulerService{
		schedulerInternal: scheduler.NewSchedulerInternal(),
	}
}

func (s *SchedulerService) AddEvent(event domains.Event) bool {
	return false
}

func (s *SchedulerService) GetEvents() []domains.Event {
	return nil
}

func (s *SchedulerService) Router(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var event domains.Event
		json.NewDecoder(r.Body).Decode(&event)
		success := s.AddEvent(event)
		if success {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("Event added successfully"))
		} else {
			w.WriteHeader(http.StatusConflict)
			w.Write([]byte("Event overlap, cannot add event"))
		}
	case http.MethodGet:
		events := s.GetEvents()
		json.NewEncoder(w).Encode(events)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
