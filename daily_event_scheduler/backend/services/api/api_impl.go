package api

import (
	"fmt"
	"net/http"
)

type ApiService struct {
}

func NewApiService() IApiService {
	return &ApiService{}
}

func (apiservice *ApiService) Start() {
	fmt.Println("Starting Server at port 8080")
	http.ListenAndServe(":8080", nil)
}

func (apiservice *ApiService) Register(path string, f func(w http.ResponseWriter, r *http.Request)) {
	http.HandleFunc(path, f)
}
