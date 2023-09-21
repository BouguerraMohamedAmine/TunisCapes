const express = require('express');
const router = express.Router();
const cityController = require('../Controllers/CityControllers');
const authenticateToken = require('../../auth/authMiddleware');

// Define routes for cities (CRUD operations)
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.post('/', cityController.createCity);
router.put('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);

module.exports = router;
