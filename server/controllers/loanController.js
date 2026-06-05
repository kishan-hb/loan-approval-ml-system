const Joi = require('joi');
const axios = require('axios');
const { requestPrediction } = require('../services/mlClient');
const config = require('../config');
const db = require('../db/dbconn');
const packageMeta = require('../package.json');
const {
  createApplication,
  createPrediction,
  getApplicationById: findApplicationById,
  getPredictionByApplicationId: findPredictionByApplicationId
} = require('../db/queries/loanQueries');

const applySchema = Joi.object({
  applicant_income: Joi.number().required(),
  coapplicant_income: Joi.number().default(0),
  loan_amount: Joi.number().required(),
  loan_term: Joi.number().required(),
  credit_history: Joi.boolean().required(),
  employment_status: Joi.string().required(),
  property_area: Joi.string().required(),
  dependents: Joi.number().integer().min(0).required(),
  education: Joi.string().required(),
  marital_status: Joi.string().required()
});

async function health(req, res) {
  const checks = {
    api: 'ok',
    database: 'down',
    mlService: 'down'
  };

  try {
    await db.query('SELECT 1');
    checks.database = 'ok';
  } catch (err) {
    checks.database = 'down';
  }

  try {
    const mlRes = await axios.get(`${config.mlServiceUrl}/health`, { timeout: 3000 });
    if (mlRes.status === 200) {
      checks.mlService = 'ok';
    }
  } catch (err) {
    checks.mlService = 'down';
  }

  const overallStatus = checks.database === 'ok' && checks.mlService === 'ok' ? 'ok' : 'degraded';

  return res.status(overallStatus === 'ok' ? 200 : 503).json({
    status: overallStatus,
    service: 'node-api',
    version: packageMeta.version,
    uptimeSeconds: Math.floor(process.uptime()),
    checks,
    timestamp: new Date().toISOString()
  });
}

async function applyLoan(req, res, next) {
  try {
    const { error, value } = applySchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map((d) => d.message)
      });
    }

    const application = await createApplication(value);
    const applicationId = application.id;

    const predictionResponse = await requestPrediction(value);

    await createPrediction(applicationId, predictionResponse);

    return res.status(201).json({
      message: 'Loan application processed',
      applicationId,
      prediction: predictionResponse.prediction,
      confidence: predictionResponse.confidence,
      modelVersion: predictionResponse.model_version
    });
  } catch (err) {
    if (err.response) {
      return res.status(502).json({
        error: 'ML service error',
        details: err.response.data
      });
    }

    return next(err);
  }
}

function getApplicationById(req, res) {
  return fetchApplication(req, res);
}

async function fetchApplication(req, res) {
  const { applicationId } = req.params;
  const item = await findApplicationById(applicationId);

  if (!item) {
    return res.status(404).json({ error: 'Application not found' });
  }

  return res.status(200).json({
    applicationId: item.id,
    applicant_income: Number(item.applicant_income),
    coapplicant_income: Number(item.coapplicant_income),
    loan_amount: Number(item.loan_amount),
    loan_term: item.loan_term,
    credit_history: item.credit_history,
    employment_status: item.employment_status,
    property_area: item.property_area,
    dependents: item.dependents,
    education: item.education,
    marital_status: item.marital_status,
    createdAt: item.created_at
  });
}

function getPredictionByApplicationId(req, res) {
  return fetchPrediction(req, res);
}

async function fetchPrediction(req, res) {
  const { applicationId } = req.params;
  const item = await findPredictionByApplicationId(applicationId);

  if (!item) {
    return res.status(404).json({ error: 'Prediction not found' });
  }

  return res.status(200).json({
    predictionId: item.id,
    applicationId: item.application_id,
    prediction: item.prediction,
    confidence: Number(item.confidence),
    modelVersion: item.model_version,
    createdAt: item.created_at
  });
}

module.exports = {
  health,
  applyLoan,
  getApplicationById,
  getPredictionByApplicationId
};
