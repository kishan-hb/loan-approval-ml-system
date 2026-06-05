from app.schemas.predict_schema import PredictRequest, PredictResponse


def predict_loan(payload: PredictRequest) -> PredictResponse:
	# Simple baseline score to validate end-to-end service wiring before ML model integration.
	score = 0.5

	total_income = payload.applicant_income + payload.coapplicant_income
	if payload.credit_history:
		score += 0.25
	if total_income >= 6000:
		score += 0.15
	if payload.loan_amount <= 200:
		score += 0.10

	confidence = min(max(score, 0.0), 0.99)
	prediction = "APPROVED" if confidence >= 0.70 else "REJECTED"

	return PredictResponse(
		prediction=prediction,
		confidence=round(confidence, 3),
		model_version="v0-baseline"
	)

