const City = require('../Models/CityModel');
const Desert = require('../Models/DesertModel');
const Event = require('../Models/EventsModel');
const Hotel = require('../Models/HotelModel');
const MaisonHote = require('../Models/MaisonHoteModel');
const Monument = require('../Models/MonumentsModel');
const Mountain = require('../Models/MountainModel');
const Museum = require('../Models/MuseumModel');
const Restaurant = require('../Models/RestModel');
const Sea = require('../Models/SeasModel');

exports.searchWithQuery = async (req, res) => {
  const query = req.params.query;  // Use req.params.query to get the query parameter

  try {
    const cities = await City.find({ name: { $regex: query, $options: 'i' } });
    const deserts = await Desert.find({ name: { $regex: query, $options: 'i' } });
    const events = await Event.find({ name: { $regex: query, $options: 'i' } });
    const hotels = await Hotel.find({ name: { $regex: query, $options: 'i' } });
    const maisonHotes = await MaisonHote.find({ name: { $regex: query, $options: 'i' } });
    const monuments = await Monument.find({ name: { $regex: query, $options: 'i' } });
    const mountains = await Mountain.find({ name: { $regex: query, $options: 'i' } });
    const museums = await Museum.find({ name: { $regex: query, $options: 'i' } });
    const restaurants = await Restaurant.find({ name: { $regex: query, $options: 'i' } });
    const seas = await Sea.find({ name: { $regex: query, $options: 'i' } });

    res.json({
      cities,
      deserts,
      events,
      hotels,
      maisonHotes,
      monuments,
      mountains,
      museums,
      restaurants,
      seas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
