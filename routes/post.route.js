const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

router.get("/api/post", async (req, res, next) => {
  let postList = await Post.find({}).limit(3);
  res.json({ posts: postList });
});

router.post("/api/post", async (req, res, next) => {
  const { title, author, content } = req.body;
  console.log(req.file.filename)
  // console.log(req)
  const imageUrl = `localhost:3000/uploads/${req.file.filename}`;

  if(!title || !author || !content){
    return res.status(400).send('Title, author and content are required!');
  }
  const post = new Post({
    title: title,
    author: author,
    content: content,
    // imageUrl: imageUrl,
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
