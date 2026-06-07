jest.mock('../db/dbconn', () => ({
  query: jest.fn(),
  pool: { end: jest.fn() }
}));

jest.mock('axios', () => ({
  get: jest.fn()
}));

const supertest = require('supertest');
const app = require('../app');
const db = require('../db/dbconn');
const axios = require('axios');

const request = supertest(app);

describe('GET /api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns health response', async () => {
    db.query.mockResolvedValueOnce({ rows: [{ ok: 1 }] });
    axios.get.mockResolvedValueOnce({ status: 200, data: { status: 'ok' } });

    const res = await request.get('/api/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('checks');
    expect(res.body.checks).toEqual({
      api: 'ok',
      database: 'ok',
      mlService: 'ok'
    });
  });
});
