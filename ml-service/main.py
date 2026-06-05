from fastapi import FastAPI

from app.api.predict import router as predict_router


app = FastAPI(title="Loan ML Service", version="0.1.0")
app.include_router(predict_router)

