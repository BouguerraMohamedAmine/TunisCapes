const Restaurant = require('../Models/RestModel');
const City = require('../Models/CityModel');

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  const { name, cuisine, cityId, price, reviews } = req.body;
  if (!name || !cuisine || !cityId || !price ) {
    return res.status(400).json({ error: 'Name, cuisine, cityId, price, and reviews are required' });
  }

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const restaurant = new Restaurant({
      name,
      cuisine,
      city: city._id,
      price,
      reviews,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getRestaurantsInCity = async (req, res) => {
    const cityId = req.params.cityId; 
    try {
      const restaurantsInCity = await Restaurant.find({ city: cityId });
      res.json(restaurantsInCity);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  