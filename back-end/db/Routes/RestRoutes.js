const express = require('express');
const router = express.Router();
const restaurantController = require('../Controllers/RestControllers');

// Define routes for restaurants (CRUD operations)
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', restaurantController.createRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);
router.get('/city/:cityId', restaurantController.getRestaurantsByCityId);

router.get('/city/:cityId', restaurantController.getRestaurantsInCity);

module.exports = router;
