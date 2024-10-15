# Koach.ai
This repository contains two projects: aws_lambda_s3_apis and daily_event_scheduler. Below you will find details about each project, including how to run them and any relevant configurations.

## AWS Lambda and S3 APIs
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

## Daily Event Scheduler
This is the daily event scheduler application which has a Go backend and an Angular frontend.

### Frontend 
To start the frontend, run the following commands:
```bash
cd daily_event_scheduler\frontend
ng serve --open
```
- Input sanitization with corresponding error messages has been implemented.

### Backend 
To start the backend run the following commands:
```bash
cd daily_event_scheduler\backend
go run .\cmd\server\main.go
```
- Tested endpoints in postman and have exported my postman file as a json in the main folder

### Files
- `frontend/`: Contains the Angular project for the frontend.
- `backend/`: Contains the Go backend, with the entry point in cmd/server/main.go.
- `postman_collection.json`: Postman collection for testing API endpoints.

## Babylon Shape Extrusion with Colyseus
This project is a multiplayer game built using **BabylonJS** for the AngularJS frontend and **ColyseusJS** for the NodeJS backend.

### Frontend
To start the frontend, run the following commands:
```bash
cd babylon_shape_extrusion_with_colyseus/client
ng serve --open
```
- A small canvas allows users to draw 2D shapes, which are then extruded into 3D objects on a 3D plane.
- Users can move their 3D objects as well as navigate within the 3D space.

### Backend
To start the backend, run the following commands:
```bash
cd babylon_shape_extrusion_with_colyseus/server
npm start
```
- The backend uses ColyseusJS to set up game rooms that clients can join to interact with other players.
- **Note**: Currently, the functionality for clients to successfully join rooms is a work in progress.
- Once the room-joining feature is implemented, clients will be able to see and interact with shapes created by other players in the same room.

### Project Structure
- `client/`: Contains the frontend project built with BabylonJS and AngularJS.
- `server/`: Contains the backend setup using ColyseusJS for multiplayer game logic.