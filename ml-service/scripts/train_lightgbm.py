from __future__ import annotations

import json
from pathlib import Path
import joblib
import pandas as pd
import lightgbm as lgb
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from sklearn.model_selection import train_test_split

# Locate your root ml-service directory dynamically
ROOT_DIR = Path(__file__).resolve().parent.parent

def main() -> None:
	# 1. Load the original raw dataset
	dataset_path = ROOT_DIR / "data" / "raw" / "credit-g.arff"
	from scipy.io import arff
	records, _ = arff.loadarff(dataset_path)
	df = pd.DataFrame(records)

	# Decode byte strings from ARFF into normal text strings
	object_cols = df.select_dtypes(include=["object"]).columns
	for col in object_cols:
		df[col] = df[col].apply(lambda v: v.decode("utf-8") if isinstance(v, bytes) else v)

	# 2. Target Variable Isolation
	y = df["class"].map({"good": 1, "bad": 0})
	
	# 3. Feature Selection: Build the exact 10-field contract expected by Node.js
	# We map the legacy columns into what your PredictRequest schema requires
	X = pd.DataFrame()
	X["applicant_income"] = df["credit_amount"] / 10 # Scale down to realistic income
	X["coapplicant_income"] = 0.0 # Synthetic default fallback
	X["loan_amount"] = df["credit_amount"] / 10 # Scale down to realistic loan size
	X["loan_term"] = (df["duration"] / 72) * 360 # Scale up to standard 360-month terms
	X["credit_history"] = df["credit_history"].apply(lambda x: True if "existing" in str(x) else False)
	X["employment_status"] = df["employment"].apply(lambda x: "Salaried" if "1<=" in str(x) or ">=" in str(x) else "Unemployed")
	X["property_area"] = df["property_magnitude"].apply(lambda x: "Urban" if "real estate" in str(x) else "Semi-Urban")
	X["dependents"] = df["num_dependents"].astype(int)
	X["education"] = df["job"].apply(lambda x: "Graduate" if "skilled" in str(x) else "Undergraduate")
	X["marital_status"] = "Married" # Structural placeholder to match schema input

	# 4. Enforce Native Categorical Columns for LightGBM
	categorical_cols = ["employment_status", "property_area", "education", "marital_status"]
	for col in categorical_cols:
		X[col] = X[col].astype("category")

	# 5. Split data into train and test groups
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

	# 6. Train the LightGBM Classifier
	model = lgb.LGBMClassifier(
		n_estimators=150,
		learning_rate=0.03,
		max_depth=6,
		random_state=42,
		class_weight="balanced",
		verbosity=-1
	)
	model.fit(X_train, y_train, categorical_feature=categorical_cols)

	# 7. Evaluate Performance
	y_pred = model.predict(X_test)
	y_prob = model.predict_proba(X_test)[:, 1]
	
	metrics = {
		"accuracy": round(accuracy_score(y_test, y_pred), 4),
		"f1": round(f1_score(y_test, y_pred), 4),
		"roc_auc": round(roc_auc_score(y_test, y_prob), 4),
	}

	# 8. Save the Unified High-Performance Artifact
	models_dir = ROOT_DIR / "artifacts" / "trained_models"
	models_dir.mkdir(parents=True, exist_ok=True)
	
	joblib.dump(model, models_dir / "lightgbm_loan_model.joblib")

	# Save metadata catalog
	metadata = {
		"model_version": "v2.0.0-lightgbm",
		"metrics": metrics,
		"target_mapping": {"APPROVED": 1, "REJECTED": 0},
		"features": X.columns.tolist(),
	}
	(models_dir / "metadata_lightgbm.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")

	print("LightGBM Training Complete!")
	print(json.dumps(metrics, indent=2))

if __name__ == "__main__":
	main()
