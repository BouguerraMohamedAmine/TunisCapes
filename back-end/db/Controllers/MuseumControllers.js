const Museum = require('../Models/MuseumModel');
const City = require('../Models/CityModel.js');

// Get all museums
exports.getAllMuseums = async (req, res) => {
  try {
    const museums = await Museum.find();
    res.json(museums);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get museum by ID
exports.getMuseumById = async (req, res) => {
  try {
    const museum = await Museum.findById(req.params.id);
    if (!museum) {
      return res.status(404).json({ error: 'Museum not found' });
    }
    res.json(museum);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new museum
exports.createMuseum = async (req, res) => {
  const { name, cityId, price, pictures } = req.body;
  if (!name || !cityId || !price || !pictures) {
    return res.status(400).json({ error: 'Name, cityId, price, and pictures are required' });
  }

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const museum = new Museum({
      name,
      city: city._id,
      price,
      pictures
    });

    await museum.save();
    res.status(201).json(museum);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a museum by ID
exports.updateMuseum = async (req, res) => {
  try {
    const updatedMuseum = await Museum.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMuseum) {
      return res.status(404).json({ error: 'Museum not found' });
    }
    res.json(updatedMuseum);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a museum by ID
exports.deleteMuseum = async (req, res) => {
  try {
    const deletedMuseum = await Museum.findByIdAndRemove(req.params.id);
    if (!deletedMuseum) {
      return res.status(404).json({ error: 'Museum not found' });
    }
    res.json({ message: 'Museum deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getMuseumsByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;
    const museums = await Museum.find({ city: cityId });
    res.status(200).json(museums);
  } catch (error) {
    console.error('Error fetching museums by City ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
