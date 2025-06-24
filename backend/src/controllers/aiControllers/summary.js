const { generateSummary } = require('@/helpers');
const { summarySchema } = require('./schemaValidate');

const summary = async (req, res) => {
  const { error, value } = summarySchema.validate(req.body, { stripUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Cannot generate summary for empty notes',
    });
  }
  const combined = value.map((note) => note).join('\n');

  const summary = await generateSummary(combined);

  return res.status(200).json({
    success: true,
    result: summary,
    message: 'Summary Created',
  });
};

module.exports = summary;
