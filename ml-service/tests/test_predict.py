from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Existing payload dictionary used across our unit tests
VALID_PAYLOAD = {
	'applicant_income': 6500,
	'coapplicant_income': 1200,
	'loan_amount': 180,
	'loan_term': 360,
	'credit_history': True,
	'employment_status': 'Salaried',
	'property_area': 'Urban',
	'dependents': 1,
	'education': 'Graduate',
	'marital_status': 'Married'
}

def test_health_ok():
	response = client.get('/health')
	assert response.status_code == 200
	assert response.json() == {
		'status': 'ok',
		'service': 'ml-service'
	}

def test_predict_success():
	"""Sunny-day test: Verifies that our real, loaded model evaluates live inputs successfully."""
	response = client.post('/predict', json=VALID_PAYLOAD)
	assert response.status_code == 200
	body = response.json()
	assert body['prediction'] in ['APPROVED', 'REJECTED']
	assert isinstance(body['confidence'], float)
	assert body['model_version'] == 'v2.0.0-lightgbm'

def test_predict_invalid_payload():
	"""Validation test: Verifies that missing input parameters return a 422 Unprocessable Entity error."""
	invalid_payload = VALID_PAYLOAD.copy()
	del invalid_payload['applicant_income'] # Drop field to trigger validation crash

	response = client.post('/predict', json=invalid_payload)
	assert response.status_code == 422

# =====================================================================
# NEW SUBTASK TESTS: ARTIFACT VALIDATIONS & ERROR CONDITIONS
# =====================================================================

@patch('app.services.prediction_service.joblib.load')
def test_loaded_model_prediction_logic(mock_joblib_load):
	"""
	Loaded-Model Predict Test: Mocks joblib to isolate prediction calculations 
	and ensure our code handles raw structural array outputs flawlessly.
	"""
	# 1. Mock the pipeline and model behavior
	mock_model = MagicMock()
	# Simulate LightGBM predicting a 1 (APPROVED) [INDEX]
	mock_model.predict.return_value = [1]
	# Simulate LightGBM probability return array: [[bad_risk_prob, good_risk_prob]]
	mock_model.predict_proba.return_value = [[0.15, 0.85]]
	
	# Pass the mock objects back into our load pipeline loop
	mock_joblib_load.return_value = mock_model

	# 2. Fire request
	response = client.post('/predict', json=VALID_PAYLOAD)
	
	# 3. Assert mock logic successfully parsed down to the user schema
	assert response.status_code == 200
	body = response.json()
	assert body['prediction'] == 'APPROVED'
	assert body['confidence'] == 0.85

@patch('app.services.prediction_service.Path.exists')
def test_missing_artifact_error_handling(mock_exists):
	"""
	Missing-Artifact Error Test: Forces the server path lookup to return False, 
	verifying that the service raises a proper HTTP 500 error when files are deleted [INDEX].
	"""
	# Force Path.exists() to return False for all model checks [INDEX]
	mock_exists.return_value = False

	# Hit the route endpoint
	response = client.post('/predict', json=VALID_PAYLOAD)
	
	# Verify that the system handles the failure with an explicit 500 server exception
	assert response.status_code == 500
	assert "LightGBM artifacts missing" in response.json()['detail']
