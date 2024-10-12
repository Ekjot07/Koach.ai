package scheduler

import "github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/domains"

type ISchedulerInternal interface {
	AddEvent(domains.Event) bool
	GetEvents() []domains.Event
}
