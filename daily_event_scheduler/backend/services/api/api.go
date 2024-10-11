package api

import "net/http"

type IApiService interface {
	Start()
	Register(path string, f func(w http.ResponseWriter, r *http.Request))
}
