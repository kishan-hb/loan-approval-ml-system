# Design Document

## Purpose

This document defines the first implementation target for the loan approval prediction system. It describes scope, data flow, API contracts, storage, model behavior, and the initial delivery decisions for a two-service architecture.

## Scope

### In Scope

- Loan application submission API.
- Authentication-ready Node.js backend structure.
- PostgreSQL persistence for applications and predictions.
- Python FastAPI prediction service.
- Baseline machine learning inference pipeline.
- Health checks for both services.

### Out of Scope for the First Release

- User-facing dashboard and analytics UI.
- Model retraining automation.
- Explainability tooling beyond basic prediction metadata.
- Multi-model routing or ensemble strategies.

## Core Design Decisions

### 1. Node.js owns the application workflow

The Node.js service is the primary backend entry point. It is responsible for request validation, security checks, persistence, and communication with the Python service. This keeps business logic centralized and makes the client integration simple.

### 2. Python owns prediction logic

The Python FastAPI service handles model loading, preprocessing, and inference. This is the best fit for the ML stack because it keeps the machine learning code in the ecosystem where the training pipeline will also live.

### 3. PostgreSQL is the source of truth

All submitted applications and scoring outputs should be stored in PostgreSQL so the system can support auditing, reporting, and later product features.

## Request Lifecycle

1. Client sends loan data to the Node.js API.
2. Node.js validates the payload and stores the request.
3. Node.js forwards the approved feature set to the Python service.
4. Python preprocesses features and runs the model.
5. Python returns a prediction result with confidence or score.
6. Node.js stores the result and returns the final response.

## API Design

### Node.js API Endpoints

- `POST /api/loans/apply` submits a loan application.
- `GET /api/loans/:id` retrieves one stored application.
- `GET /api/loans/:id/prediction` retrieves the latest prediction.
- `GET /api/health` checks Node service status.

### Python Service Endpoints

- `GET /health` checks ML service status.
- `POST /predict` accepts feature data and returns a prediction.

## Proposed Prediction Payload

The exact schema can change as we confirm the dataset, but the first version should support fields such as:

- applicant income
- co-applicant income
- loan amount
- loan term
- credit history
- employment status
- property area
- dependents
- education level
- marital status

The Node.js layer should validate types and required fields before calling Python.

## Data Model

### applications

Stores the original loan submission.

Suggested columns:

- id
- applicant_name or applicant_reference
- payload_json
- created_at
- updated_at

### predictions

Stores the output of the ML service.

Suggested columns:

- id
- application_id
- model_version
- predicted_class
- probability_score
- prediction_json
- created_at

## Service Structure

### server/

- `controllers/` handles request/response orchestration.
- `routes/` defines API paths.
- `services/` contains business logic and Python service calls.
- `models/` contains database models.
- `middleware/` handles errors, auth, and request processing.
- `utils/` contains reusable helpers and validation.
- `config/` stores database and service configuration.

### ml-service/

- `app/api/` defines FastAPI endpoints.
- `app/core/` stores settings and shared utilities.
- `app/schemas/` defines request and response contracts.
- `app/services/` loads model artifacts and performs inference.
- `app/models/` can hold domain objects or model metadata.

## Error Handling

- Invalid input should fail fast at the Node layer.
- Python should return clear validation and inference errors.
- Node should translate service errors into consistent client responses.
- Both services should log enough information to trace a failed prediction without exposing secrets.

## Logging and Observability

- Log each application submission with a correlation identifier.
- Log each prediction request and response with service timestamps.
- Track model version used for each prediction.
- Keep logs structured so they can later be shipped to a monitoring system.

## Security Considerations

- Keep secrets in environment variables.
- Restrict public access to Node.js only.
- Authenticate protected API routes before prediction submission.
- Validate all client input before sending it to Python.
- Use internal service-to-service calls for Node to Python communication.

## Initial Technology Choices

- Node.js runtime for the main API.
- FastAPI for the ML service.
- PostgreSQL for persistence.
- Python ML stack with scikit-learn to start.
- HTTP JSON for inter-service communication.

## Delivery Plan

1. Finalize the field list for the loan application schema.
2. Define the PostgreSQL tables.
3. Implement the Python FastAPI prediction endpoint.
4. Implement the Node.js application endpoint and service call.
5. Add integration tests.
6. Train a baseline model and wire it into the ML service.
