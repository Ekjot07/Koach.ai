package scheduler

import "github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/domains"

//Concrete Implementation of our Internal Scheduler
type SchedulerInternal struct {
	events []domains.Event
}

// Return object of our Internal Scheduler as type of Interface for abstraction
func NewSchedulerInternal() ISchedulerInternal {
	return &SchedulerInternal{}
}

// Logic to add events to scheduler
func (schedulerInternal *SchedulerInternal) AddEvent(newEvent domains.Event) bool {
	// Check if input is valid
	st := newEvent.StartTime
	end := newEvent.EndTime
	if st >= end || st < 0 || st > 23 || end < 0 || end > 23 {
		return false
	}

	// Perform a binary search to find the insertion point
	left, right := 0, len(schedulerInternal.events)
	for left < right {
		mid := (left + right) / 2
		if schedulerInternal.events[mid].StartTime < st {
			left = mid + 1
		} else {
			right = mid
		}
	}
	// Check for overlap with adjacent events
	if left > 0 && st < schedulerInternal.events[left-1].EndTime {
		return false
	}
	if left < len(schedulerInternal.events) && end > schedulerInternal.events[left].StartTime {
		return false
	}
	// If no overlap, insert the new event at the sorted position
	schedulerInternal.events = append(schedulerInternal.events[:left], append([]domains.Event{newEvent}, schedulerInternal.events[left:]...)...)
	return true
}

// Retrieve all events in our scheduler
func (schedulerInternal *SchedulerInternal) GetEvents() []domains.Event {
	return schedulerInternal.events
}
