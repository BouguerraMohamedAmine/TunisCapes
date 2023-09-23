const Sea = require('../Models/SeasModel');
const City = require('../Models/CityModel');

// Get all seas
exports.getAllSeas = async (req, res) => {
  try {
    const seas = await Sea.find();
    res.json(seas);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get sea by ID
exports.getSeaById = async (req, res) => {
  try {
    const sea = await Sea.findById(req.params.id);
    if (!sea) {
      return res.status(404).json({ error: 'Sea not found' });
    }
    res.json(sea);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new sea
exports.createSea = async (req, res) => {
  const { name, cityId, depth, pictures } = req.body;
  if (!name || !cityId || !depth || !pictures) {
    return res.status(400).json({ error: 'Name, cityId, depth, and pictures are required' });
  }

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const sea = new Sea({
      name,
      city: city._id,
      depth,
      pictures
    });

    await sea.save();
    res.status(201).json(sea);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a sea by ID
exports.updateSea = async (req, res) => {
  try {
    const updatedSea = await Sea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSea) {
      return res.status(404).json({ error: 'Sea not found' });
    }
    res.json(updatedSea);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a sea by ID
exports.deleteSea = async (req, res) => {
  try {
    const deletedSea = await Sea.findByIdAndRemove(req.params.id);
    if (!deletedSea) {
      return res.status(404).json({ error: 'Sea not found' });
    }
    res.json({ message: 'Sea deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
