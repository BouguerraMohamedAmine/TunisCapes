const express = require('express');
const mongoose = require('mongoose');
const cityRoutes = require('../db/Routes/CityRoutes'); // Corrected path
const restaurantRoutes = require('../db/Routes/RestRoutes'); // Corrected path
const hotelRoutes = require('../db/Routes/Hotels'); // Corrected path
const userRoutes = require ('../db/Routes/UserRoutes.js')
const app = express();
const port = 3000;
const cors = require('cors');
const connectDatabase = require("../db/config");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
connectDatabase()


app.use('/cities', cityRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/hotels', hotelRoutes);
app.use('/users', userRoutes);



// Assuming you have received the plain text password from the request
async function hashPassword(plainTextPassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10); // 10 is the number of salt rounds
    return hashedPassword;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

// Usage example
const plainTextPassword = 'your_plain_text_password';
hashPassword(plainTextPassword)
  .then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
