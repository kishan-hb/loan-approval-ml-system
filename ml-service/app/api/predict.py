from fastapi import APIRouter

from app.schemas.predict_schema import PredictRequest, PredictResponse
from app.services.prediction_service import predict_loan


router = APIRouter(tags=["prediction"])


@router.get("/health")
def health() -> dict:
	return {
		"status": "ok",
		"service": "ml-service"
	}


@router.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest) -> PredictResponse:
	return predict_loan(payload)

