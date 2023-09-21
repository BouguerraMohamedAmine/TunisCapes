const City = require('../Models/CityModel');



const ERROR_CITY_NOT_FOUND = 'City not found';
const ERROR_INTERNAL_SERVER = 'Internal server error';
const ERROR_NAME_COUNTRY_REQUIRED = 'Name and country are required';

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get city by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new city
exports.createCity = async (req, res) => {
  const { name, country, description, pictures } = req.body;

  // Validate required fields
  if (!name || !country) {
    return res.status(400).json({ error: 'Name and country are required' });
  }

  try {
    // Create a new City instance including pictures
    const city = new City({ name, country, description, pictures });

    // Save the city to the database
    await city.save();

    // Respond with the newly created city document
    res.status(201).json(city);
  } catch (error) {
    console.error('Error creating city:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCity) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndRemove(req.params.id);
    if (!deletedCity) {
      return res.status(404).json({ error: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
