const express = require('express');
const app = express();
const port = 3100; // You can change this to any available port you prefer

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
