const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const { applySchema } = require('../validators/loanValidator');
const {
  health,
  applyLoan,
  getApplicationById,
  getPredictionByApplicationId
} = require('../controllers/loanController');

router.get('/health', health);
router.post('/loans/apply', validateRequest(applySchema), applyLoan);
router.get('/loans/:applicationId', getApplicationById);
router.get('/loans/:applicationId/prediction', getPredictionByApplicationId);

module.exports = router;