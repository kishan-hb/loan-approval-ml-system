const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

async function requestPrediction(payload) {
  const response = await axios.post(`${ML_SERVICE_URL}/predict`, payload, {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = {
  requestPrediction
};
