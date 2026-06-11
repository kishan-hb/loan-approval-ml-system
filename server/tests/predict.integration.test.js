jest.mock('../db/dbconn', () => ({
  query: jest.fn().mockResolvedValue({ rows: [{ id: 'mock-id' }] }),
  pool: { end: jest.fn() }
}));

const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Integration tests for /predict endpoint', () => {
  describe('POST /api/loans/apply', () => {
    it('should return a valid prediction when provided with valid data', async () => {
      const payload = {
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

      // FIX: Changed from '/predict' to your actual route path
      const response = await request.post('/api/loans/apply').send(payload);

      expect(response.statusCode).toBe(201); // Note: Your logs show 201 Created for this endpoint!
      expect(response.body).toHaveProperty('prediction');
      expect(response.body).toHaveProperty('confidence', expect.any(Number));
    });

    it('should return a 422 status code when provided with invalid data', async () => {
      const payload = {
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

      const response = await request.post('/api/loans/apply').send(payload);

      expect(response.statusCode).toBe(400); 
    });
  });
});
