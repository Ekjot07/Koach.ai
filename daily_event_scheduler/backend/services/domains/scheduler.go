package domains

// Event definiton for our service files
type Event struct {
	StartTime int `json:"start_time"`
	EndTime   int `json:"end_time"`
}
