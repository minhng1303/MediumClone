const express = require("express");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const router = express.Router();
const Post = require("../models/post.model");
const Tag = require("../models/tag.model");
const Author = require("../models/author.model");

const getPosts = async (req, res, next) => {
  // let postList = await Post.find({}).limit(3);
  // res.json({ posts: postList });

  let postList;
  try {
    // postList = await Post.find({}).limit(5);
    postList = await Post.find({});
  } catch (err) {
    const error = new HttpError("Fetching post failed, please try again!");
    return next(error);
  }

  if (postList.length === 0) {
    const error = new HttpError("Could not find any posts!", 404);
    return next(error);
  }
  res.json({ posts: postList.map((post) => post.toObject({ getter: true })) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 222)
    );
  }

  const { title, sub_title, content, author, tag } = req.body;

  let existingTag;
  try{
    existingTag = await Tag.find({ name: tag });
    // console.log(existingTag);

  }catch(err){

    const error = new HttpError('Create post failed, please try again!', 500);
    return next(error);
  }
  if(!existingTag){
      const error = new HttpError('Could not find tag!');
      return next(error);
  }

  let existingAuthor;
  try{
    existingAuthor = await Author.find({ name: author });
    // console.log(existingAuthor);

  }catch(err){

    const error = new HttpError('Create post failed, please try again!', 500);
    return next(error);
  }
  if(!existingAuthor){
      const error = new HttpError('Could not find author!');
      return next(error);
  }

  const createdPost = await new Post({
    title,
    sub_title,
    content,
    author: existingAuthor,
    tag: existingTag,
    imageUrl: "Test"
    // imageUrl: req.file.filename
});

// console.log(existingTag)

  try{
    // await createdPost.save();
      const sess = await mongoose.startSession();
      sess.startTransaction();
      console.log('Start transaction');
    //   // console.log(sess);
      await createdPost.save({ session: sess });
      console.log("Saved Post");
      existingTag.posts.push(createdPost);
      console.log('Saved tag')
      await existingTag.save({ session: sess });

    //   console.log(existingTag)

      existingAuthor.posts.push(createdPost);
      await existingAuthor.save({ session: sess });

      await sess.commitTransaction();

  }catch(err){
    const error = new HttpError('Creating post failed (session), please try again!', 500);
    return next(error);
  }

  res.status(201).json({ post: createdPost });
};


exports.getPosts = getPosts;
// exports.getPostById = getPostById;
exports.createPost = createPost;
