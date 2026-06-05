CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_income NUMERIC(12,2) NOT NULL,
  coapplicant_income NUMERIC(12,2) NOT NULL DEFAULT 0,
  loan_amount NUMERIC(12,2) NOT NULL,
  loan_term INT NOT NULL,
  credit_history BOOLEAN NOT NULL,
  employment_status TEXT NOT NULL,
  property_area TEXT NOT NULL,
  dependents INT NOT NULL CHECK (dependents >= 0),
  education TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  prediction TEXT NOT NULL CHECK (prediction IN ('APPROVED','REJECTED')),
  confidence NUMERIC(5,4) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  model_version TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_predictions_application_id
  ON predictions(application_id);
