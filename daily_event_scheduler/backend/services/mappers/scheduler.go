package mappers

import (
	domainsInternal "github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/internal/domains"
	"github.com/Ekjot07/Koach.ai/daily_event_scheduler/backend/services/domains"
)

func ConvertApiRequestToSchedulerDomain(e domains.Event) domainsInternal.Event {
	return domainsInternal.Event{
		StartTime: e.StartTime,
		EndTime:   e.EndTime,
	}
}

func ConvertSchedulerDomainApiToResponse(schedulerEvents []domainsInternal.Event) []domains.Event {
	var events []domains.Event
	for _, e := range schedulerEvents {
		event := domains.Event{
			StartTime: e.StartTime,
			EndTime:   e.EndTime,
		}
		events = append(events, event)
	}
	return events
}
