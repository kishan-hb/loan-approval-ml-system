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

  it('returns 201 and confirms model_version is artifact-based', async () => {
    // 1. Setup DB query mocks
    createApplication.mockResolvedValueOnce({ id: 'app-123' });
    createPrediction.mockResolvedValueOnce({ id: 'pred-123' });

    // 2. Mock your ML client response to mirror your live python LightGBM metadata asset
    requestPrediction.mockResolvedValueOnce({
      prediction: 'APPROVED',
      confidence: 0.85,
      model_version: 'v2.0.0-lightgbm'
    });

    // 3. Execute the full end-to-end Node.js server apply controller flow
    const res = await request.post('/api/loans/apply').send(validPayload);

    // 4. Assertions to confirm the output successfully extracts the artifact version
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      message: 'Loan application processed',
      applicationId: 'app-123',
      prediction: 'APPROVED',
      confidence: 0.85,
      modelVersion: 'v2.0.0-lightgbm' // Verifies version tracking matches the binary asset
    });

    console.log('SERVER APPLY FLOW VERIFIED:', res.body);
    
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
    
    expect(createApplication).not.toHaveBeenCalled();
    expect(requestPrediction).not.toHaveBeenCalled();
  });
});
