# Koach.ai
This repository contains two projects: aws_lambda_s3_apis and daily_event_scheduler. Below you will find details about each project, including how to run them and any relevant configurations.

## aws_lambda_s3_apis
This project demonstrates the use of AWS Lambda, S3, and API Gateway to upload JSON files to an S3 bucket via an API.

### Setup and Configuration
- **S3, Lambda, and API Gateway Configurations**: Screenshots showing the configuration of S3, Lambda, and API Gateway are available in the `assets` folder.
- **AWS SAM**: The function is defined using AWS SAM, with configurations stored in a `req_typeJsonLambda.yaml` file. The function code is located in `index.mjs` of its corresponding request type.
- **Postman**: The API endpoints were tested using Postman. The Postman collection file can be found in the root directory as `postman_collection.json`.

### Files
- `index.mjs`: Lambda function code.
- `template.yaml`: AWS SAM configuration for the Lambda function and API Gateway.
- `assets/`: Contains screenshots of AWS configurations.
- `postman_collection.json`: Exported Postman requests.

## daily_event_scheduler
This is the daily event scheduler application which has a Go backend and an Angular frontend.

### Frontend 
To start the frontend, run the following commands:
```
cd daily_event_scheduler\frontend
ng serve --open
```
- Input sanitization with corresponding error messages has been implemented.

### Backend 
To start the backend run the following commands:
```
cd daily_event_scheduler\backend
go run .\cmd\server\main.go
```
- Tested endpoints in postman and have exported my postman file as a json in the main folder

### Files
- `frontend/`: Contains the Angular project for the frontend.
- `backend/`: Contains the Go backend, with the entry point in cmd/server/main.go.
- `postman_collection.json`: Postman collection for testing API endpoints.