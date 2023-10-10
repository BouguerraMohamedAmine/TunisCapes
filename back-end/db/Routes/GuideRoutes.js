// routes/guideRoutes.js

const express = require('express');
const GuideController = require('../Controllers/guideControllers');

const router = express.Router();

// Create a new guide
router.post('/', GuideController.createGuide);

router.post('/register', GuideController.registerGuide);


// Get all guides
router.get('/', GuideController.getAllGuides);

// Get guide by ID
router.get('/guides/:guideId', GuideController.getGuideById);

// Update a guide by ID
router.put('/guides/:guideId', GuideController.updateGuide);

// Delete a guide by ID
router.delete('/guides/:guideId', GuideController.deleteGuide);

module.exports = router;
