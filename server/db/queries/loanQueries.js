const db = require('../dbconn');

async function createApplication(payload) {
  const query = `
    INSERT INTO applications (
      applicant_income,
      coapplicant_income,
      loan_amount,
      loan_term,
      credit_history,
      employment_status,
      property_area,
      dependents,
      education,
      marital_status
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING id, created_at,
      applicant_income,
      coapplicant_income,
      loan_amount,
      loan_term,
      credit_history,
      employment_status,
      property_area,
      dependents,
      education,
      marital_status;
  `;

  const values = [
    payload.applicant_income,
    payload.coapplicant_income,
    payload.loan_amount,
    payload.loan_term,
    payload.credit_history,
    payload.employment_status,
    payload.property_area,
    payload.dependents,
    payload.education,
    payload.marital_status
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function createPrediction(applicationId, predictionData) {
  const query = `
    INSERT INTO predictions (application_id, prediction, confidence, model_version)
    VALUES ($1, $2, $3, $4)
    RETURNING id, application_id, prediction, confidence, model_version, created_at;
  `;

  const values = [
    applicationId,
    predictionData.prediction,
    predictionData.confidence,
    predictionData.model_version
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function getApplicationById(applicationId) {
  const query = `
    SELECT
      id,
      applicant_income,
      coapplicant_income,
      loan_amount,
      loan_term,
      credit_history,
      employment_status,
      property_area,
      dependents,
      education,
      marital_status,
      created_at
    FROM applications
    WHERE id = $1;
  `;

  const result = await db.query(query, [applicationId]);
  return result.rows[0] || null;
}

async function getPredictionByApplicationId(applicationId) {
  const query = `
    SELECT
      id,
      application_id,
      prediction,
      confidence,
      model_version,
      created_at
    FROM predictions
    WHERE application_id = $1
    ORDER BY created_at DESC
    LIMIT 1;
  `;

  const result = await db.query(query, [applicationId]);
  return result.rows[0] || null;
}

module.exports = {
  createApplication,
  createPrediction,
  getApplicationById,
  getPredictionByApplicationId
};
