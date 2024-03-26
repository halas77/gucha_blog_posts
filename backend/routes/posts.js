const express = require("express");
const Post = require("../models/Post");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Create Post

router.post("/create", verifyToken, async (req, res) => {
  try {
    // input validations
    const validationErrors = [];

    // Title Validation
    if (
      !req.body.title ||
      typeof req.body.title !== "string" ||
      req.body.title.trim() === ""
    ) {
      validationErrors.push(
        "Title is required and must be a non-empty string."
      );
    } else if (req.body.title.length > 255) {
      validationErrors.push("Title cannot exceed 255 characters.");
    }

    if (validationErrors.length > 0) {
      // Return 400 Bad Request with error details
      return res.status(400).json({ errors: validationErrors });
    }

    
    const newPost = new Post(req.body);
    // console.log(req.body)
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Posts or Search Posts

router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };

    const posts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Post Detail

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Posts from specific user

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Post

router.put("/:id", verifyToken, async (req, res) => {
  try {
    // console.log('you are here');
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Post

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json("Post has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
