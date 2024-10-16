package scheduler

import (
	"net/http"

	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/domains"
)

// Interface for implementation of our Scheduler endpoint
type ISchedulerAPI interface {
	AddEvent(event domains.Event) bool
	GetEvents() []domains.Event
	Router(w http.ResponseWriter, r *http.Request)
}
