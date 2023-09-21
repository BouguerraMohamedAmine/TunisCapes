const connectDatabase = require('../db/config');
const Restaurant = require('../db/Models/RestModel');
const City = require('../db/Models/CityModel');
const Hotel = require('../db/Models/HotelModel');

(async () => {
  try {
    await connectDatabase();
  
    // Create a new City
    const newCity = await City.create({
      name: 'New York',
      country: 'USA',
      // Add any other city-specific fields you need
    });
    
    const newRestaurant = await Restaurant.create({
      name: 'Restaurant Name',
      cuisine: 'Cuisine Type',
      city: newCity._id, // Reference the newly created City
      price: 29.99,
      // Add any other restaurant-specific fields you need
    });
    
    const newHotel = await Hotel.create({
      name: 'Hotel Name',
      stars: 4,
      city: newCity._id, // Reference the newly created City
      price: 199.99,
      // Add any other hotel-specific fields you need
    });
    const newUser = await User.create({
      username: 'john_doe',
      email: 'johndoe@example.com',
      password: 'hashed_password_here', // Be sure to hash the password before inserting it
      // Add any other user-specific fields you need
    });

    // Print the newly created City, Restaurant, and Hotel
    console.log('City:', newCity);
    console.log('Restaurant:', newRestaurant);
    console.log('Hotel:', newHotel);
    console.log('User:', newUser);
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
  
})();