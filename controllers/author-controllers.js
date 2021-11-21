const express = require("express");
const HttpError = require("../models/http-error");
const Author = require("../models/author.model");
const { validationResult } = require("express-validator");

const getAuthors = async (req, res, next) => {
  let authorList;
  try {
    authorList = await Author.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching authors failed, please try again!",
      500
    );
    return next(error);
  }

  if (authorList.length === 0) {
    const error = new HttpError("Could not find any author!", 404);
    return next(error);
  }
  // res.json({ tag: authorList });
  res.json({
    authors: authorList.map((author) => author.toObject({ getter: true })),
  });
};

const createAuthor = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data.", 422)
    );
  }
  const { name, avatar, short_intro } = req.body;
  let existingAuthor;
  try {
    existingAuthor = await Author.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Create an author failed, please try again!",
      500
    );
    return next(error);
  }
  if (existingAuthor) {
    const error = new HttpError("Author exists already!", 422);
    return next(error);
  }
  const newAuthor = new Author({ name, short_intro, avatar, posts: [] });

  try {
    await newAuthor.save();
  } catch (err) {
    const error = new HttpError(
      "Save the author failed, please try again!",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({
      name: newAuthor.name,
      short_intro: newAuthor.short_intro,
      avatar: newAuthor.avatar,
      posts: newAuthor.posts,
    });
};

exports.getAuthors = getAuthors;
exports.createAuthor = createAuthor;
