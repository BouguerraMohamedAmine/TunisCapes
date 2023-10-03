// searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../Controllers/SearchController');

// Define route for search with query
router.get('/:query', searchController.searchWithQuery);

module.exports = router;
