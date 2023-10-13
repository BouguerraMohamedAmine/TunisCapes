const express = require('express');
const router = express.Router();
const monumentsController = require('../Controllers/MonumentsControllers');

// Define routes for monuments (CRUD operations)
router.get('/:id', monumentsController.getMonumentById);
router.get('/', monumentsController.getAllMonuments);
router.post('/', monumentsController.createMonument);
router.put('/:id', monumentsController.updateMonument);
router.delete('/:id', monumentsController.deleteMonument);
router.get('/city/:cityId', monumentsController.getMonumentsByCityId);

module.exports = router;

