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
router.get('/:guideId', GuideController.getGuideById); // Remove 'guides/'

// Update a guide by ID
router.put('/:guideId', GuideController.updateGuide); // Remove 'guides/'

// Delete a guide by ID
router.delete('/:guideId', GuideController.deleteGuide); // Remove 'guides/'

router.get('/city/:cityId', GuideController.getGuidesByCityId);

module.exports = router;
