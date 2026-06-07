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

const supertest = require('supertest');
const app = require('../app');
const {
  getApplicationById,
  getPredictionByApplicationId
} = require('../db/queries/loanQueries');

const request = supertest(app);

describe('GET retrieval endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 for existing application', async () => {
    getApplicationById.mockResolvedValueOnce({
      id: 'app-123',
      applicant_income: 6500,
      coapplicant_income: 1200,
      loan_amount: 180,
      loan_term: 360,
      credit_history: true,
      employment_status: 'Salaried',
      property_area: 'Urban',
      dependents: 1,
      education: 'Graduate',
      marital_status: 'Married',
      created_at: '2026-06-06T00:00:00.000Z'
    });

    const res = await request.get('/api/loans/app-123');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('applicationId', 'app-123');
    expect(res.body).toHaveProperty('loan_amount', 180);
  });

  it('returns 404 for missing application', async () => {
    getApplicationById.mockResolvedValueOnce(null);

    const res = await request.get('/api/loans/missing-app');

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Application not found'
      }
    });
  });

  it('returns 200 for existing prediction', async () => {
    getPredictionByApplicationId.mockResolvedValueOnce({
      id: 'pred-123',
      application_id: 'app-123',
      prediction: 'APPROVED',
      confidence: 0.99,
      model_version: 'v0-baseline',
      created_at: '2026-06-06T00:00:00.000Z'
    });

    const res = await request.get('/api/loans/app-123/prediction');

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      predictionId: 'pred-123',
      applicationId: 'app-123',
      prediction: 'APPROVED',
      modelVersion: 'v0-baseline'
    });
  });

  it('returns 404 for missing prediction', async () => {
    getPredictionByApplicationId.mockResolvedValueOnce(null);

    const res = await request.get('/api/loans/missing-app/prediction');

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Prediction not found'
      }
    });
  });
});
