import json
from pathlib import Path
import joblib
import pandas as pd
from app.schemas.predict_schema import PredictRequest, PredictResponse
from fastapi import HTTPException

# Path routing to locate artifacts
ARTIFACTS_DIR = Path(__file__).resolve().parent.parent.parent / "artifacts"

def load_ml_assets():
	"""Loads the high-performance LightGBM model and metadata."""
	model_path = ARTIFACTS_DIR / "trained_models" / "lightgbm_loan_model.joblib"
	metadata_path = ARTIFACTS_DIR / "trained_models" / "metadata_lightgbm.json"
	
	if not model_path.exists():
		raise HTTPException(
			status_code=500, 
			detail=f"LightGBM artifacts missing. Checked path: {model_path.absolute()}"
		)
	
	model = joblib.load(model_path)
	
	metadata = {}
	if metadata_path.exists():
		metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
		
	return model, metadata

def predict_loan(payload: PredictRequest) -> PredictResponse:
	# 1. Load the unified brain into memory
	model, metadata = load_ml_assets()
	
	# 2. Direct Extraction: Feed the 10 fields straight from Pydantic into a DataFrame row!
	# No more messy 20-column mapping arrays required.
	input_data = {
		"applicant_income": payload.applicant_income,
		"coapplicant_income": payload.coapplicant_income,
		"loan_amount": payload.loan_amount,
		"loan_term": payload.loan_term,
		"credit_history": bool(payload.credit_history),
		"employment_status": str(payload.employment_status),
		"property_area": str(payload.property_area),
		"dependents": int(payload.dependents),
		"education": str(payload.education),
		"marital_status": str(payload.marital_status)
	}
	
	df_input = pd.DataFrame([input_data])
	
	# 3. Enforce the exact category data types the model expects
	categorical_cols = ["employment_status", "property_area", "education", "marital_status"]
	for col in categorical_cols:
		df_input[col] = df_input[col].astype("category")
	
	# 4. High-Performance Inference Execution
	prediction_code = int(model.predict(df_input)[0])
	probabilities_matrix = model.predict_proba(df_input)[0]
	confidence_score = float(probabilities_matrix[prediction_code])
	
	# 5. Output Construction
	prediction_label = "APPROVED" if prediction_code == 1 else "REJECTED"
	
	return PredictResponse(
		prediction=prediction_label,
		confidence=round(confidence_score, 3),
		model_version=metadata.get("model_version", "v2.0.0-lightgbm")
	)
