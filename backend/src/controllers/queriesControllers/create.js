const mongoose = require('mongoose');

const Model = mongoose.model('Queries');

const { createSchema } = require('./schemaValidate');

const create = async (req, res) => {
  const { error, value } = createSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  const result = await new Model(value).save();

  return res.status(201).json({
    success: true,
    result: result,
    message: 'Query created successfully',
  });
};

module.exports = create;
