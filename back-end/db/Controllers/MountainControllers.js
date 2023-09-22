const Mountain = require('../Models/MountainModel');
const City = require('../Models/CityModel.js');


// Get all mountains
exports.getAllMountains = async (req, res) => {
  try {
    const mountains = await Mountain.find();
    res.json(mountains);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get mountain by ID
exports.getMountainById = async (req, res) => {
  try {
    const mountain = await Mountain.findById(req.params.id);
    if (!mountain) {
      return res.status(404).json({ error: 'Mountain not found' });
    }
    res.json(mountain);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new mountain
exports.createMountain = async (req, res) => {
    const { name, cityId, height, description, pictures } = req.body;
    if (!name || !cityId || !height || !pictures) {
      return res.status(400).json({ error: 'Name, cityId, height, and pictures are required' });
    }
  
    try {
      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json({ error: 'City not found' });
      }
  
      const mountain = new Mountain({
        name,
        city: city._id,
        height,
        description,
        pictures
      });
  
      await mountain.save();
      res.status(201).json(mountain);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
};
  

// Update a mountain by ID
exports.updateMountain = async (req, res) => {
  try {
    const updatedMountain = await Mountain.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMountain) {
      return res.status(404).json({ error: 'Mountain not found' });
    }
    res.json(updatedMountain);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a mountain by ID
exports.deleteMountain = async (req, res) => {
  try {
    const deletedMountain = await Mountain.findByIdAndRemove(req.params.id);
    if (!deletedMountain) {
      return res.status(404).json({ error: 'Mountain not found' });
    }
    res.json({ message: 'Mountain deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
