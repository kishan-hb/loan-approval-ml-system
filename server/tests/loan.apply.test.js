jest.mock('../db/dbconn', () => ({
  query: jest.fn(),
  pool: { end: jest.fn() }
}));

jest.mock('../db/queries/loanQueries', () => ({
  createApplication: jest.fn(),
  createPrediction: jest.fn(),
  getApplicationById: jest.fn(),
  getPredictionByApplicationId: jest.fn()
}));

jest.mock('../services/mlClient', () => ({
  requestPrediction: jest.fn()
}));

const supertest = require('supertest');
const app = require('../app');
const {
  createApplication,
  createPrediction
} = require('../db/queries/loanQueries');
const { requestPrediction } = require('../services/mlClient');

const request = supertest(app);

const validPayload = {
  applicant_income: 6500,
  coapplicant_income: 1200,
  loan_amount: 180,
  loan_term: 360,
  credit_history: true,
  employment_status: 'Salaried',
  property_area: 'Urban',
  dependents: 1,
  education: 'Graduate',
  marital_status: 'Married'
};

describe('POST /api/loans/apply', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 201 for a valid payload', async () => {
    createApplication.mockResolvedValueOnce({ id: 'app-123' });
    requestPrediction.mockResolvedValueOnce({
      prediction: 'APPROVED',
      confidence: 0.99,
      model_version: 'v1.0.0' // UPDATED: Match the real python service output
    });
    createPrediction.mockResolvedValueOnce({ id: 'pred-123' });

    const res = await request.post('/api/loans/apply').send(validPayload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Loan application processed',
      applicationId: 'app-123',
      prediction: 'APPROVED',
      confidence: 0.99,
      modelVersion: 'v1.0.0' // UPDATED: Match snakeCase wrapper transformation
    });
    console.log('VALID APPLY BODY:', res.body);
    expect(createApplication).toHaveBeenCalledTimes(1);
    expect(requestPrediction).toHaveBeenCalledTimes(1);
    expect(createPrediction).toHaveBeenCalledTimes(1);
  });

  it('returns 400 for invalid payload', async () => {
    const invalidPayload = {
      ...validPayload,
      applicant_income: undefined
    };

    const res = await request.post('/api/loans/apply').send(invalidPayload);

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed'
      }
    });
    console.log('VALID APPLY BODY:', res.body);
    expect(createApplication).not.toHaveBeenCalled();
    expect(requestPrediction).not.toHaveBeenCalled();
  });
});
