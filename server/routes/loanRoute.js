const express = require('express');
const router = express.Router();
const {
  health,
  applyLoan,
  getApplicationById,
  getPredictionByApplicationId
} = require('../controllers/loanController');

router.get('/health', health);
router.post('/loans/apply', applyLoan);
router.get('/loans/:applicationId', getApplicationById);
router.get('/loans/:applicationId/prediction', getPredictionByApplicationId);

module.exports = router;