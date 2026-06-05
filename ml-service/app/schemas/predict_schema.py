from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
	applicant_income: float = Field(gt=0)
	coapplicant_income: float = Field(ge=0, default=0)
	loan_amount: float = Field(gt=0)
	loan_term: float = Field(gt=0)
	credit_history: bool
	employment_status: str
	property_area: str
	dependents: int = Field(ge=0)
	education: str
	marital_status: str


class PredictResponse(BaseModel):
	prediction: str
	confidence: float
	model_version: str

