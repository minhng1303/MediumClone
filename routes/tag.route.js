const express = require("express");
const router = express.Router();
const Tag = require("../models/tag.model");

router.get("/api/tag", async (req, res, next) => {
  let tagList = await Tag.find({});
  res.json({ tag: tagList });
});

router.post("/api/tag", async (req, res, next) => {
  const { name } = req.body;
  const newTag = new Tag({ name });

  if (!name) {
    return res.status(400).send("Name is required!");
  }

  newTag.save((error) => {
    if (error) {
      return res.status(500).json({ message: "Sorry, internal server error" });
    }
    res.json({
      message: "Created tag successfully",
      createTag: newTag,
    });
  });
});

module.exports = router;
