const mongoose = require('mongoose');

const Model = mongoose.model('Queries');

const deleteNote = async (req, res) => {
  const { id, noteId } = req.params;

  const query = await Model.findById(id);
  if (!query) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Query not found',
    });
  }

  const noteInitialLength = query.notes.length;
  query.notes = query.notes.filter((note) => note._id.toString() !== noteId);
  if (noteInitialLength === query.notes.length) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'Note not found',
    });
  }

  await query.save();

  return res
    .status(200)
    .json({ success: true, result: query.notes, message: 'Note deleted successfully' });
};

module.exports = deleteNote;
