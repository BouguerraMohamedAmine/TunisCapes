const express = require('express');
const router = express.Router();
const mountainsController = require('../Controllers/MountainControllers');

// Define routes for mountains (CRUD operations)
router.get('/:id', mountainsController.getMountainById);
router.get('/', mountainsController.getAllMountains);
router.post('/', mountainsController.createMountain);
router.put('/:id', mountainsController.updateMountain);
router.delete('/:id', mountainsController.deleteMountain);
router.get('/city/:cityId', mountainsController.getMountainsByCityId);

module.exports = router;
