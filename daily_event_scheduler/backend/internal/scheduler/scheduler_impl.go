package scheduler

import "github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/domains"

type SchedulerInternal struct {
	events []domains.Event
}

func NewSchedulerInternal() ISchedulerInternal {
	return &SchedulerInternal{}
}

func (schedulerInternal *SchedulerInternal) AddEvent(domains.Event) bool {
	return false
}

func (schedulerInternal *SchedulerInternal) GetEvents() []domains.Event {
	return schedulerInternal.events
}
