const express = require('express');
const router = express.Router();
const seasController = require('../Controllers/SeasControllers');

// Define routes for seas (CRUD operations)
router.get('/:id', seasController.getSeaById);
router.get('/', seasController.getAllSeas);
router.post('/', seasController.createSea);
router.put('/:id', seasController.updateSea);
router.delete('/:id', seasController.deleteSea);

module.exports = router;
