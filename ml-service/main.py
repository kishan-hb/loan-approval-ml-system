from contextlib import asynccontextmanager
import sys
from fastapi import FastAPI

from app.api.predict import router as predict_router
from app.services.prediction_service import load_ml_assets


# 1. Add Startup Validation & Health Signal
@asynccontextmanager
async def lifespan(app: FastAPI):
	print("=" * 60)
	print("STARTUP HEALTH CHECK: Validating Machine Learning Assets...")
	print("=" * 60)
	
	try:
		# Attempt to load assets on boot to ensure files are present and uncorrupted
		model, metadata = load_ml_assets()
		
		print("✅ SUCCESS: Machine Learning Model Loaded Successfully!")
		print(f"📦 Model Version: {metadata.get('model_version', 'Unknown')}")
		print(f"📊 Target Features: {len(metadata.get('features', []))} fields tracked")
		print("🚀 Status: READY to accept inference traffic from Node.js.")
		print("=" * 60)
		
	except Exception as e:
		print("❌ CRITICAL ERROR: Model readiness validation failed at startup!")
		print(f"Reason: {str(e)}")
		print("Shutting down service to prevent dead-looping in production.")
		print("=" * 60)
		# Hard crash the application boot instance to signal deployment failure
		sys.exit(1)
		
	yield


# 2. Wire the Lifespan Hook into the FastAPI App
app = FastAPI(title="Loan ML Service", version="2.0.0", lifespan=lifespan)
app.include_router(predict_router)


# 3. Dedicated Health Endpoint for Load Balancers / Readiness Probes
@app.get("/health")
def health_check():
	return {"status": "ok", "service": "ml-service"}
