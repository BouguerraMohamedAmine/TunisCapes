const Monument = require('../Models/MonumentsModel');
const City = require('../Models/CityModel.js'); // Import the City model for city references

// Get all monuments
exports.getAllMonuments = async (req, res) => {
  try {
    const monuments = await Monument.find();
    res.json(monuments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get monument by ID
exports.getMonumentById = async (req, res) => {
  try {
    const monument = await Monument.findById(req.params.id);
    if (!monument) {
      return res.status(404).json({ error: 'Monument not found' });
    }
    res.json(monument);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new monument
exports.createMonument = async (req, res) => {
  const { name, cityId, pictures } = req.body;
  if (!name || !cityId || !pictures) {
    return res.status(400).json({ error: 'Name, cityId, and pictures are required' });
  }

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const monument = new Monument({
      name,
      city: city._id,
      pictures
    });

    await monument.save();
    res.status(201).json(monument);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a monument by ID
exports.updateMonument = async (req, res) => {
  try {
    const updatedMonument = await Monument.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMonument) {
      return res.status(404).json({ error: 'Monument not found' });
    }
    res.json(updatedMonument);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a monument by ID
exports.deleteMonument = async (req, res) => {
  try {
    const deletedMonument = await Monument.findByIdAndRemove(req.params.id);
    if (!deletedMonument) {
      return res.status(404).json({ error: 'Monument not found' });
    }
    res.json({ message: 'Monument deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
