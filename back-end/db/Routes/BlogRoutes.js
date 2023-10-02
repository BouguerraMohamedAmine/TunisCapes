const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/BlogControllers');


router.post('/', blogController.createBlog);
router.get('/' , blogController.getBlogs)
router.get('/:id',blogController.getBlogById )
router.get('/user/:userId', blogController.getBlogsByUser);
router.put('/:id', blogController.updateBlog)
router.delete('/:id', blogController.deleteBlog);
router.get('/:title', blogController.getBlogByTitle);


module.exports = router;