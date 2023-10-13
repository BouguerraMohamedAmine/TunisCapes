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
exports.getDesertsByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;
    
    // Use the cityId to find deserts related to the specified city
    const deserts = await Desert.find({ city: cityId });
    
    res.json(deserts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.addReview = async (req, res) => {
  try {
    const { desertId, rating, comment } = req.body;

    // Find the desert by ID
    const desert = await Desert.findById(desertId);

    if (!desert) {
      return res.status(404).json({ message: 'Desert not found' });
    }

    // Create a new review object
    const review = {
      rating,
      comment,
    };

    // Add the review to the desert's reviews array
    desert.reviews.push(review);

    // Save the updated desert document
    await desert.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get reviews for a desert
exports.getReviews = async (req, res) => {
  try {
    const desertId = req.params.id;

    // Find the desert by ID
    const desert = await Desert.findById(desertId);

    if (!desert) {
      return res.status(404).json({ message: 'Desert not found' });
    }

    res.status(200).json({ reviews: desert.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
