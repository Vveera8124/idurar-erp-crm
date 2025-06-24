const mongoose = require('mongoose');

const Model = mongoose.model('Queries');

const { updateSchema } = require('./schemaValidate');

const update = async (req, res) => {
  const { error, value } = updateSchema.validate(req.body, { stripUnknown: true });

  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  const result = await Model.findOneAndUpdate({ _id: req.params.id }, value, {
    new: true,
  }).exec();

  return res.status(200).json({
    success: true,
    result,
    message: 'Document updated',
  });
};

module.exports = update;
