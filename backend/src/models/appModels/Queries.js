const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const querySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ['Open', 'Closed', 'InProgress'], default: 'open' },
  notes: [noteSchema],
  resolution: { type: String, maxlength: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Queries', querySchema);
