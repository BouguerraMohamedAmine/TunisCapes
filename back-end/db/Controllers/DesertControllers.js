const Desert = require('../Models/DesertModel');
const City = require('../Models/CityModel');

// Get all deserts
exports.getAllDeserts = async (req, res) => {
  try {
    const deserts = await Desert.find();
    res.json(deserts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get desert by ID
exports.getDesertById = async (req, res) => {
  try {
    const desert = await Desert.findById(req.params.id);
    if (!desert) {
      return res.status(404).json({ error: 'Desert not found' });
    }
    res.json(desert);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new desert
exports.createDesert = async (req, res) => {
  const { name, cityId, description, pictures } = req.body;
  if (!name || !cityId || !description || !pictures) {
    return res.status(400).json({ error: 'Name, cityId, description, and pictures are required' });
  }

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const desert = new Desert({
      name,
      city: city._id,
      description,
      pictures
    });

    await desert.save();
    res.status(201).json(desert);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a desert by ID
exports.updateDesert = async (req, res) => {
  try {
    const updatedDesert = await Desert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDesert) {
      return res.status(404).json({ error: 'Desert not found' });
    }
    res.json(updatedDesert);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a desert by ID
exports.deleteDesert = async (req, res) => {
  try {
    const deletedDesert = await Desert.findByIdAndRemove(req.params.id);
    if (!deletedDesert) {
      return res.status(404).json({ error: 'Desert not found' });
    }
    res.json({ message: 'Desert deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
