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

function createHttpError(statusCode, code, message, details = null) {
  return { statusCode, code, message, details };
}

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
    const value = req.body;

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
      return next(
        createHttpError(
          502,
          'ML_SERVICE_ERROR',
          'ML service request failed',
          err.response.data
        )
      );
    }

    return next(err);
  }
}

function getApplicationById(req, res, next) {
  return fetchApplication(req, res, next);
}

async function fetchApplication(req, res, next) {
  try {
    const { applicationId } = req.params;
    const item = await findApplicationById(applicationId);

    if (!item) {
      return next(createHttpError(404, 'NOT_FOUND', 'Application not found'));
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
  } catch (err) {
    return next(err);
  }
}

function getPredictionByApplicationId(req, res, next) {
  return fetchPrediction(req, res, next);
}

async function fetchPrediction(req, res, next) {
  try {
    const { applicationId } = req.params;
    const item = await findPredictionByApplicationId(applicationId);

    if (!item) {
      return next(createHttpError(404, 'NOT_FOUND', 'Prediction not found'));
    }

    return res.status(200).json({
      predictionId: item.id,
      applicationId: item.application_id,
      prediction: item.prediction,
      confidence: Number(item.confidence),
      modelVersion: item.model_version,
      createdAt: item.created_at
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  health,
  applyLoan,
  getApplicationById,
  getPredictionByApplicationId
};
