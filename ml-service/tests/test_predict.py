from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_health_ok():
	response = client.get('/health')

	assert response.status_code == 200
	assert response.json() == {
		'status': 'ok',
		'service': 'ml-service'
	}


def test_predict_success():
	payload = {
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

	response = client.post('/predict', json=payload)

	assert response.status_code == 200
	body = response.json()
	assert body['prediction'] in ['APPROVED', 'REJECTED']
	assert isinstance(body['confidence'], float)
	# FIXED: Safely encapsulated inside the test function context block
	assert body['model_version'] == 'v2.0.0-lightgbm'


def test_predict_invalid_payload():
	invalid_payload = {
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

	response = client.post('/predict', json=invalid_payload)

	assert response.status_code == 422
