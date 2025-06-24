const Joi = require('joi');

const createSchema = Joi.object({
  customerName: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Open', 'Closed', 'InProgress').default('Open'),
  notes: Joi.array().items(Joi.object({ content: Joi.string().required() })),
  resolution: Joi.string().max(100).allow(''),
});

const updateSchema = Joi.object({
  status: Joi.string().valid('Open', 'Closed', 'InProgress').default('Open'),
  resolution: Joi.string().max(100).allow(''),
});

const noteSchema = Joi.object({ content: Joi.string().required() });

module.exports = { createSchema, updateSchema, noteSchema };
