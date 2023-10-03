const MaisonHote = require('../Models/MaisonHoteModel');
const City = require('../Models/CityModel');

// Get all maison-hotes
exports.getAllMaisonHotes = async (req, res) => {
  try {
    const maisonHotes = await MaisonHote.find();
    res.json(maisonHotes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get maison-hote by ID
exports.getMaisonHoteById = async (req, res) => {
  try {
    const maisonHote = await MaisonHote.findById(req.params.id);
    if (!maisonHote) {
      return res.status(404).json({ error: 'MaisonHote not found' });
    }
    res.json(maisonHote);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new maison-hote
exports.createMaisonHote = async (req, res) => {
    const { name, cityId, price, pictures, description } = req.body; // Description: Additional information about the Maison Hote.

    if (!name || !cityId || !price || !pictures || !description) {
      return res.status(400).json({ error: 'Name, cityId, price, and pictures are required' });
    }

    try {
      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json({ error: 'City not found' });
      }

      const maisonHote = new MaisonHote({
        name,
        city: city._id,
        price,
        pictures,
        description, // Include the description field when creating a new Maison Hote.
      });

      await maisonHote.save();
      res.status(201).json(maisonHote);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Update a maison-hote by ID
exports.updateMaisonHote = async (req, res) => {
  try {
    const updatedMaisonHote = await MaisonHote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMaisonHote) {
      return res.status(404).json({ error: 'MaisonHote not found' });
    }
    res.json(updatedMaisonHote);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a maison-hote by ID
exports.deleteMaisonHote = async (req, res) => {
  try {
    const deletedMaisonHote = await MaisonHote.findByIdAndRemove(req.params.id);
    if (!deletedMaisonHote) {
      return res.status(404).json({ error: 'MaisonHote not found' });
    }
    res.json({ message: 'MaisonHote deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get maison-hotes in a specific city
exports.getMaisonHotesInCity = async (req, res) => {
  const cityId = req.params.cityId; 
  try {
    const maisonHotesInCity = await MaisonHote.find({ city: cityId });
    res.json(maisonHotesInCity);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
