const { Blog } = require('../Models/BlogModel');

async function createBlog(req, res) {
  try {
    const { body, userId, username, profileImage, images } = req.body;
    if (!body || !userId || !username || !profileImage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBlog = await Blog.create({ body, userId, username, profileImage, images });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getBlogs(req, res) {
  try {
    // Use a projection to select the fields you need
    const blogs = await Blog.find()
      .populate('creator', 'username profileImage')
      .lean(); 

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateBlog(req, res) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteBlog(req, res) {
  console.log("Received DELETE request for blog ID:", req.params.id);

  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getBlogsByUser(req, res) {
  const userId = req.params.userId;
  try {
    const blogs = await Blog.find({ creator: userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching blogs.' });
  }
}



async function getBlogByTitle(req, res) {
  try {
    const title = req.params.title; // Assuming the title is passed as a URL parameter
    const blog = await Blog.findOne({ title });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
  getBlogByTitle
};
