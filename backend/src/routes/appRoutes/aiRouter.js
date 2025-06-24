const express = require('express');

const { catchErrors } = require('@/handlers/errorHandlers');
const aiController = require('@/controllers/aiControllers');

const router = express.Router();

router.post('/summary', catchErrors(aiController.summary));

module.exports = router;
