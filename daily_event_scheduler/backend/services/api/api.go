package api

import "net/http"

//Interface for API service which will initialize and create endpoints
type IApiService interface {
	Start()
	Register(path string, f func(w http.ResponseWriter, r *http.Request))
}
