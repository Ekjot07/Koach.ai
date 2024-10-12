package scheduler

import (
	"encoding/json"
	"net/http"

	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/scheduler"
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/domains"
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/mappers"
)

// Concrete Implementation of our Scheduler endpoint
type SchedulerService struct {
	schedulerInternal scheduler.ISchedulerInternal
}

// Return object of our Scheduler Service as type of Interface for abstraction
func NewSchedulerService() ISchedulerAPI {
	return &SchedulerService{
		schedulerInternal: scheduler.NewSchedulerInternal(),
	}
}

// Convert and send request to Internal Scheduler to see if we can add the event
func (s *SchedulerService) AddEvent(event domains.Event) bool {
	return s.schedulerInternal.AddEvent(mappers.ConvertApiRequestToSchedulerDomain(event))
}

// Convert and send reponse back
func (s *SchedulerService) GetEvents() []domains.Event {
	return mappers.ConvertSchedulerDomainApiToResponse(s.schedulerInternal.GetEvents())
}

// Handle get and post requests and call corresponding function
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
			w.Write([]byte("Invalid Input or Event overlap, cannot add event"))
		}
	case http.MethodGet:
		events := s.GetEvents()
		json.NewEncoder(w).Encode(events)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
