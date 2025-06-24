const mongoose = require('mongoose');

const Model = mongoose.model('Queries');

const { noteSchema } = require('./schemaValidate');

const addNote = async (req, res) => {
  const { error, value } = noteSchema.validate(req.body, { stripUnknown: true });
  if (error) {
    const { details } = error;
    return res.status(400).json({
      success: false,
      result: null,
      message: details[0]?.message,
    });
  }

  const query = await Model.findById(req.params.id);
  if (!query) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found',
    });
  }

  query.notes.push(value);
  await query.save();

  const result = query.notes;

  return res.status(201).json({
    success: true,
    result,
    message: 'Notes added successfully',
  });
};

module.exports = addNote;
