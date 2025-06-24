const mongoose = require('mongoose');

const Model = mongoose.model('Queries');

const read = async (req, res) => {
  const result = await Model.findOne({
    _id: req.params.id,
  }).exec();
  return res.status(200).json({
    success: true,
    result,
    message: result ? 'Document found.' : 'No document found.',
  });
};

module.exports = read;
