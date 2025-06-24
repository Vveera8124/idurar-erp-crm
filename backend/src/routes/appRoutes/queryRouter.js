const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');

const router = express.Router();

const queryController = require('@/controllers/queriesControllers');

//______________Query Management______________________
router.get('/queries/:id', catchErrors(queryController.read));
router.get('/queries', catchErrors(queryController.paginatedList));

router.post('/queries', catchErrors(queryController.create));
router.post('/queries/:id/notes', catchErrors(queryController.addNote));

router.put('/queries/:id', catchErrors(queryController.update));

router.delete('/queries/:id/notes/:noteId', catchErrors(queryController.deleteNote));

module.exports = router;
