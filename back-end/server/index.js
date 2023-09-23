const express = require('express');
const mongoose = require('mongoose');
const cityRoutes = require('../db/Routes/CityRoutes'); // Corrected path
const restaurantRoutes = require('../db/Routes/RestRoutes'); // Corrected path
const hotelRoutes = require('../db/Routes/Hotels'); // Corrected path
const userRoutes = require ('../db/Routes/UserRoutes.js')
const maisonHotesRoutes = require('../db/Routes/MaisonHoteRoutes.js'); // Corrected import
const monumentsRoutes = require('../db/Routes/MonumentsRoutes')
const museumRoutes = require('../db/Routes/MuseumRoutes');
const mountainRoutes = require('../db/Routes/MountainRoutes');
const seasRoutes = require('../db/Routes/SeasRoutes');
const desertRoutes = require('../db/Routes/DesertRoutes')

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
app.use('/mh', maisonHotesRoutes);
app.use('/monuments', monumentsRoutes)
app.use('/museums', museumRoutes);
app.use('/moun', mountainRoutes);
app.use('/seas', seasRoutes);
app.use('/deserts', desertRoutes); 

const Message = mongoose.model('Message', {
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  createdAt: Date,
  user: {
    _id: String,
    avatar: String,
  },
});

// Endpoint to retrieve chat messages
app.get('/messages', (req, res) => {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error retrieving messages' });
    });
});

// Endpoint to send a new message
app.post('/messages', (req, res) => {
  const { text, user, createdAt } = req.body;

  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    text,
    user,
    createdAt,
  });

  message
    .save()
    .then((result) => {
      console.log('Message saved:', result);
      res.status(201).json(result);
    })
    .catch((error) => {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Error sending message' });
    });
});













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
