const express = require('express');
const router = express.Router();

const stuffController = require('../controllers/stuff');

router.post('/', stuffController.createTest);

router.put('/:id', stuffController.modifyTest);

router.delete('/:id', stuffController.deleteTest);

router.get('/:id', stuffController.getOneTest);

router.get('/', stuffController.getAllTests);

module.exports = router;