from __future__ import annotations

import argparse
import json
from pathlib import Path

import joblib
import pandas as pd
from scipy.io import arff
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


def parse_args() -> argparse.Namespace:
	parser = argparse.ArgumentParser(description="Train credit-risk model from ARFF file")
	parser.add_argument(
		"--data-path",
		type=Path,
		default=Path("data/raw/credit-g.arff"),
		help="Path to ARFF dataset",
	)
	parser.add_argument(
		"--model-version",
		type=str,
		default="v1.0.0",
		help="Model version to store in metadata",
	)
	return parser.parse_args()


def load_arff(path: Path) -> pd.DataFrame:
	records, _ = arff.loadarff(path)
	df = pd.DataFrame(records)

	# Decode byte strings from ARFF into normal text.
	object_cols = df.select_dtypes(include=["object"]).columns
	for col in object_cols:
		df[col] = df[col].apply(lambda value: value.decode("utf-8") if isinstance(value, bytes) else value)

	return df


def build_pipeline(numeric_cols: list[str], categorical_cols: list[str]) -> Pipeline:
	numeric_pipe = Pipeline(
		steps=[
			("imputer", SimpleImputer(strategy="median")),
			("scaler", StandardScaler()),
		]
	)

	categorical_pipe = Pipeline(
		steps=[
			("imputer", SimpleImputer(strategy="most_frequent")),
			("encoder", OneHotEncoder(handle_unknown="ignore")),
		]
	)

	preprocessor = ColumnTransformer(
		transformers=[
			("num", numeric_pipe, numeric_cols),
			("cat", categorical_pipe, categorical_cols),
		]
	)

	return Pipeline(
		steps=[
			("preprocessor", preprocessor),
			("model", LogisticRegression(max_iter=1000, class_weight="balanced")),
		]
	)


def save_artifacts(
	pipeline: Pipeline,
	metrics: dict[str, float],
	model_version: str,
	feature_names: list[str],
) -> None:
	base_dir = Path(__file__).resolve().parents[1]
	encoders_dir = base_dir / "artifacts" / "encoders"
	models_dir = base_dir / "artifacts" / "trained_models"
	encoders_dir.mkdir(parents=True, exist_ok=True)
	models_dir.mkdir(parents=True, exist_ok=True)

	preprocessor = pipeline.named_steps["preprocessor"]
	model = pipeline.named_steps["model"]

	joblib.dump(preprocessor, encoders_dir / "preprocessor.joblib")
	joblib.dump(model, models_dir / "loan_model.joblib")

	metadata = {
		"model_version": model_version,
		"metrics": metrics,
		"target_mapping": {"good": 1, "bad": 0},
		"features": feature_names,
	}
	(models_dir / "metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")


def main() -> None:
	args = parse_args()
	dataset_path = args.data_path
	if not dataset_path.exists():
		raise FileNotFoundError(f"Dataset not found at: {dataset_path}")

	df = load_arff(dataset_path)
	if "class" not in df.columns:
		raise ValueError("Expected target column 'class' not found in dataset")

	y = df["class"].map({"good": 1, "bad": 0})
	X = df.drop(columns=["class"])

	numeric_cols = X.select_dtypes(include=["number"]).columns.tolist()
	categorical_cols = [col for col in X.columns if col not in numeric_cols]

	X_train, X_test, y_train, y_test = train_test_split(
		X,
		y,
		test_size=0.2,
		random_state=42,
		stratify=y,
	)

	pipeline = build_pipeline(numeric_cols, categorical_cols)
	pipeline.fit(X_train, y_train)

	y_pred = pipeline.predict(X_test)
	y_prob = pipeline.predict_proba(X_test)[:, 1]
	metrics = {
		"accuracy": round(accuracy_score(y_test, y_pred), 4),
		"f1": round(f1_score(y_test, y_pred), 4),
		"roc_auc": round(roc_auc_score(y_test, y_prob), 4),
	}

	save_artifacts(
		pipeline=pipeline,
		metrics=metrics,
		model_version=args.model_version,
		feature_names=X.columns.tolist(),
	)

	print("Training complete")
	print(json.dumps(metrics, indent=2))


if __name__ == "__main__":
	main()
