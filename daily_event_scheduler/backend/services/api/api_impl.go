package api

import (
	"fmt"
	"net/http"
)

// Concrete implementation of API service
type ApiService struct {
}

// Creates object of our API service and return it as a type of interface
func NewApiService() IApiService {
	return &ApiService{}
}

// Starts our server
func (apiservice *ApiService) Start() {
	fmt.Println("Starting Server at port 8080")
	http.ListenAndServe(":8080", nil)
}

// Creates endpoints
func (apiservice *ApiService) Register(path string, f func(w http.ResponseWriter, r *http.Request)) {
	http.HandleFunc(path, f)
}
