// controllers/guideController.js

const Guide = require('../Models/GuideModel');

// Create a new guide
exports.createGuide = async (req, res) => {
  try {
    const guideData = req.body;
    const guide = new Guide(guideData);
    const savedGuide = await guide.save();
    res.status(201).json(savedGuide);
  } catch (error) {
    console.error('Error creating guide:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all guides
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    res.status(200).json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a guide by ID
exports.getGuideById = async (req, res) => {
  try {
    const { guideId } = req.params;
    const guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    res.status(200).json(guide);
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a guide by ID
exports.updateGuide = async (req, res) => {
  try {
    const { guideId } = req.params;
    const updatedGuideData = req.body;
    const updatedGuide = await Guide.findByIdAndUpdate(guideId, updatedGuideData, {
      new: true, // Return the updated guide
    });
    if (!updatedGuide) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    res.status(200).json(updatedGuide);
  } catch (error) {
    console.error('Error updating guide:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a guide by ID
exports.deleteGuide = async (req, res) => {
  try {
    const { guideId } = req.params;
    const deletedGuide = await Guide.findByIdAndRemove(guideId);
    if (!deletedGuide) {
      return res.status(404).json({ error: 'Guide not found' });
    }
    res.status(204).end(); // No content
  } catch (error) {
    console.error('Error deleting guide:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.registerGuide = async (req, res) => {
    try {
      // Extract guide data from the request body
      const {
        name,
        location,
        phoneNumber,
        languagesSpoken,
        email,
        password,
        username,
        profileImage // Added profileImage field

      } = req.body;
  
      // Create a new guide instance
      const newGuide = new Guide({
        name,
        location,
        phoneNumber,
        languagesSpoken,
        email,
        password,
        username,
        profileImage, // Added profileImage field
      });
  
      // Save the guide to the database
      await newGuide.save();
  
      res.status(201).json(newGuide); // Respond with the newly created guide
    } catch (error) {
      console.error('Guide registration error:', error);
      res.status(500).json({ message: 'Guide registration failed' });
    }
  };
  exports.getGuidesByCityId = async (req, res) => {
    try {
      const { cityId } = req.params;
      const guides = await Guide.find({ city: cityId });
      res.status(200).json(guides);
    } catch (error) {
      console.error('Error fetching guides by city ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  