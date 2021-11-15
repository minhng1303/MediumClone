const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

router.get("/api/post", async (req, res, next) => {
  let postList = await Post.find({}).limit(5);
  res.json({ posts: postList });
});

router.post("/api/post", async (req, res, next) => {
  const { title, author, content } = req.body;
  const { filePath } = req.file;
  const post = new Post({
    title: title,
    author: author,
    content: content,
    imageUrl: filePath,
  });
  post.save((error) => {
    if (error) {
      return res.status(500).json({ message: "Sorry, internal server error" });
    }
    res.json({
      message: "Created post successfully",
      createPost: post,
    });
  });
});

module.exports = router;
