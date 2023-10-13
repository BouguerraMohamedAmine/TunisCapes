const express = require('express');
const router = express.Router();
const museumsController = require('../Controllers/MuseumControllers');

// Define routes for museums (CRUD operations)
router.get('/:id', museumsController.getMuseumById);
router.get('/', museumsController.getAllMuseums);
router.post('/', museumsController.createMuseum);
router.put('/:id', museumsController.updateMuseum);
router.delete('/:id', museumsController.deleteMuseum);
router.get('/city/:cityId', museumsController.getMuseumsByCityId);

module.exports = router;
