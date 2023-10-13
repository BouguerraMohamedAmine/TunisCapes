const Hotel = require('../Models/HotelModel.js');
const City = require('../Models/CityModel.js'); // Import the City model for city references

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new hotel
exports.createHotel = async (req, res) => {
  const { name, stars, cityId, price, reviews, pictures } = req.body;
  if (!name || !stars || !cityId || !price || !reviews || !pictures) {
    return res.status(400).json({ error: 'Name, stars, cityId, price, and reviews are required' });
  }

  try {
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const hotel = new Hotel({
      name,
      stars,
      city: city._id,
      price,
      reviews,
      pictures
    });

    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a hotel by ID
exports.updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a hotel by ID
exports.deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndRemove(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.postReview = async (req, res) => {
  const { hotelId } = req.params;
  const { username, rating, comment } = req.body;

  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Create a new review object
    const newReview = {
      username,
      rating,
      comment,
    };

    // Add the review to the hotel's reviews array
    hotel.reviews.push(newReview);

    // Save the updated hotel document
    await hotel.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error posting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getReviews = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(hotel.reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getHotelsByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;
    const hotels = await Hotel.find({ city: cityId }); // Assuming the 'city' field contains the City ID for hotels
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by City ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
