const express = require('express');
const router = express.Router();
const eventsController = require('../Controllers/EventsControllers');

// Define routes for events (CRUD operations)
router.get('/:id', eventsController.getEventById);
router.get('/', eventsController.getAllEvents);
router.post('/', eventsController.createEvent);
router.put('/:id', eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;
