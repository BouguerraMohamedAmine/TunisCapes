const express = require('express');
const router = express.Router();
const desertController = require('../Controllers/DesertControllers');

// Define routes for deserts (CRUD operations)
router.get('/:id', desertController.getDesertById);
router.get('/', desertController.getAllDeserts);
router.post('/', desertController.createDesert);
router.put('/:id', desertController.updateDesert);
router.delete('/:id', desertController.deleteDesert);

module.exports = router;
