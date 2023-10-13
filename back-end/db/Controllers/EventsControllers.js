const Event = require('../Models/EventsModel');
const City = require('../Models/CityModel.js');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const { name, cityId, time, contact, picture } = req.body;
  if (!name || !cityId || !time || !contact || !picture) {
    return res.status(400).json({ error: 'Name, city, time, contact, and picture are required' });
  }

  try {
    const existingCity = await City.findById(cityId);
    if (!existingCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    const event = new Event({
      name,
      city: existingCity._id,
      time,
      contact,
      picture
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndRemove(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getEventsByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;

    // Use the cityId to find events related to the specified city
    const events = await Event.find({ city: cityId });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
