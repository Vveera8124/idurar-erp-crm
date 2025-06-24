// const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');
// const methods = createCRUDController('Queries');

const create = require('./create');
const paginatedList = require('./paginatedList');
const read = require('./read');
const update = require('./update');
const addNote = require('./addNote');
const deleteNote = require('./deleteNote');

// methods.create = create;
// methods.list = paginatedList;
// methods.read = read;
// methods.update = update;

const queryMethods = {
  read,
  create,
  update,
  paginatedList,
  addNote,
  deleteNote,
};

module.exports = queryMethods;
