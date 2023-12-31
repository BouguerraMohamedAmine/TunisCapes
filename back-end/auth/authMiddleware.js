// authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = 'W0yn7Gc4qNxvvxPCObWSK'; // Replace with your own secret key

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
