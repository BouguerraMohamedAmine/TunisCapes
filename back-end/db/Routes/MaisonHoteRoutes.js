const express = require('express');
const router = express.Router();
const MaisonHoteController = require('../Controllers/MaisonHoteController');

// Define routes for museums (CRUD operations)
router.get('/:id', MaisonHoteController.getMaisonHoteById);
router.get('/', MaisonHoteController.getAllMaisonHotes);
router.post('/', MaisonHoteController.createMaisonHote);
router.put('/:id', MaisonHoteController.updateMaisonHote);
router.delete('/:id', MaisonHoteController.deleteMaisonHote);
router.get('/city/:cityId', MaisonHoteController.getMaisonHotesInCity);

module.exports = router;
