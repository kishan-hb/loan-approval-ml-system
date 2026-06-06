const Joi = require('joi');
const applySchema = Joi.object({
  applicant_income: Joi.number().required(),
  coapplicant_income: Joi.number().default(0),
  loan_amount: Joi.number().required(),
  loan_term: Joi.number().required(),
  credit_history: Joi.boolean().required(),
  employment_status: Joi.string().required(),
  property_area: Joi.string().required(),
  dependents: Joi.number().integer().min(0).required(),
  education: Joi.string().required(),
  marital_status: Joi.string().required()
});
