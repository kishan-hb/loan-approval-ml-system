## Running Tests

From the `ml-service` folder:

```powershell
python -m pytest
```

## Test Coverage

The ML service test suite includes comprehensive coverage for:

- `GET /health` (Server state checks)
- `POST /predict` success with a valid payload using the LightGBM production engine
- `POST /predict` failure with an invalid payload checking Pydantic validation
- Loaded-Model Prediction logic checking array unpacking stability
- Missing-Artifact Error handling validating graceful HTTP 500 error propagation

## 📦 Machine Learning Artifact Contract

The FastAPI service utilizes an asynchronous lifespan context manager to load and validate model files directly at server startup. If any expected artifact name below is missing or corrupted, the process emits a failure trace and hard-terminates to prevent bad states in production.

### Expected File Names & Layout

```text
ml-service/
└── artifacts/
    ├── encoders/
    │   └── preprocessor.joblib     # Serialized scikit-learn preprocessing pipeline
    └── trained_models/
        ├── loan_model.joblib       # Serialized high-performance LightGBM model weights
        └── metadata_lightgbm.json  # Model configuration registry catalog and version tracking
```

### Ingestion Fields (PredictRequest Schema)

The model was trained directly on the 10 data points captured by the Node.js application layer. Categorical fields are dynamically converted into Pandas `category` types to feed straight into the boosting trees:

- `applicant_income` (float, > 0)
- `coapplicant_income` (float, ≥ 0)
- `loan_amount` (float, > 0)
- `loan_term` (float, > 0)
- `credit_history` (boolean, True/False)
- `employment_status` (string, "Salaried" | "Unemployed")
- `property_area` (string, "Urban" | "Semi-Urban" | "Rural")
- `dependents` (integer, ≥ 0)
- `education` (string, "Graduate" | "Undergraduate")
- `marital_status` (string, "Married" | "Single" | "Divorced")

## Notes

- Tests use FastAPI's test client alongside `unittest.mock` for infrastructure path failure overrides.
- The prediction endpoint utilizes an active tree-boosting ensemble framework and dynamically returns:
	- `prediction` (String: "APPROVED" or "REJECTED")
	- `confidence` (Float: Probabilistic model classification score)
	- `model_version` (String: Sourced from metadata, currently `v2.0.0-lightgbm`)
