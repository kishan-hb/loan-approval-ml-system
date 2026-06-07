# Server

Node.js API layer for the AI Loan Approval Prediction project.

## Running Tests

From the `server` folder:

```powershell
npm test
```

## Test Coverage

The server test suite includes coverage for:

- `GET /api/health`
- `POST /api/loans/apply` success path
- `POST /api/loans/apply` validation failure path
- `GET /api/loans/:applicationId` success and not-found paths
- `GET /api/loans/:applicationId/prediction` success and not-found paths

## Notes

- Tests run with Jest and Supertest.
- The Express app is exported separately from server startup so tests can import it without opening a real port.
