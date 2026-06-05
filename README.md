# AI Loan Approval Prediction

An end-to-end portfolio project that predicts loan approval using a two-service backend architecture:

- A Node.js API layer for request handling, orchestration, and PostgreSQL persistence.
- A Python FastAPI ML service for validation, scoring, and prediction responses.

## Project Structure

```text
AI- Loan Approval Prediction/
├─ docs/
│  ├─ architecture.md
│  └─ design.md
├─ ml-service/
│  ├─ app/
│  ├─ artifacts/
│  ├─ data/
│  ├─ notebooks/
│  ├─ scripts/
│  ├─ tests/
│  ├─ main.py
│  └─ requirements.txt
├─ server/
│  ├─ controllers/
│  ├─ db/
│  ├─ middleware/
│  ├─ routes/
│  ├─ services/
│  ├─ tests/
│  ├─ config.js
│  └─ index.js
└─ .gitignore
```

## Architecture

1. The client submits a loan application to the Node.js API.
2. The Node.js service validates the request and stores the application in PostgreSQL.
3. The Node.js service calls the Python ML service for prediction.
4. The ML service returns a prediction, confidence score, and model version.
5. The Node.js service stores the prediction and returns the response to the client.

See [docs/architecture.md](docs/architecture.md) and [docs/design.md](docs/design.md) for more detail.

## Tech Stack

- Node.js + Express
- PostgreSQL
- Python + FastAPI
- Joi for request validation
- Axios for service-to-service communication

## Local Setup

### 1. Start PostgreSQL

Create the database and run the migration in [server/db/migrations/001_create_schema.sql](server/db/migrations/001_create_schema.sql).

### 2. Start the ML service

```powershell
Set-Location "E:\Portfolio_Projects\AI- Loan Approval Prediction\ml-service"
.\.venv\Scripts\Activate.ps1
python -m uvicorn main:app --reload --port 8000
```

### 3. Start the Node API

```powershell
Set-Location "E:\Portfolio_Projects\AI- Loan Approval Prediction\server"
node index.js
```

## API Endpoints

### Node API

- `GET /api/health`
- `POST /api/loans/apply`
- `GET /api/loans/:applicationId`
- `GET /api/loans/:applicationId/prediction`

### ML Service

- `GET /health`
- `POST /predict`

## Current Status

- Initial architecture and design docs created.
- Node.js and FastAPI services wired together.
- PostgreSQL persistence added for applications and predictions.
- Baseline rule-based prediction logic implemented.

## Next Steps

- Extract validation into reusable middleware.
- Add automated tests for API and ML service.
- Replace baseline scoring rules with a trained model artifact.
- Improve README with screenshots, examples, and deployment notes.