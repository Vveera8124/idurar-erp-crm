const mongoose = require('mongoose');

const Model = mongoose.model('Queries');

const paginatedList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = req.query.filter || 'All';
  const skip = page * limit - limit;
  const query = {};

  if (filter && filter !== 'All') {
    query.status = filter;
  }

  const resultsPromise = Model.find(query).skip(skip).limit(limit).exec();
  const countPromise = Model.countDocuments(query);

  const [result, count] = await Promise.all([resultsPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  const pagination = { page, pages, count };

  return res.status(200).json({
    success: true,
    result,
    pagination,
    message: count > 0 ? 'Successfully found all documents' : 'Collection is Empty',
  });
};

module.exports = paginatedList;
