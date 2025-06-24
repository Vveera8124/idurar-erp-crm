const Joi = require('joi');

const summarySchema = Joi.array().min(1).required();

module.exports = { summarySchema };
