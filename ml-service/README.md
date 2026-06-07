## Running Tests

From the `ml-service` folder:

```powershell
python -m pytest
```

## Test Coverage

The ML service test suite includes coverage for:

- `GET /health`
- `POST /predict` success with a valid payload
- `POST /predict` failure with an invalid payload

## Notes

- Tests use FastAPI's test client.
- The prediction endpoint currently uses baseline scoring logic and returns:
	- `prediction`
	- `confidence`
	- `model_version`

