const express = require("express");
const HttpError = require("../models/http-error");
const Tag = require("../models/tag.model");
const { validationResult } = require('express-validator');

const getTags =  async (req, res, next) => {
  let tagList;
  try {
    tagList = await Tag.find({});
  } catch (err) {
    const error = new HttpError("Fetching tags failed, please try again!", 500);
    return next(error);
  }

  if(tagList.length === 0 ){
    const error = new HttpError('Could not find any tag!', 404);
    return next(error);
  }
  // res.json({ tag: tagList });
  res.json({ tags: tagList.map(tag => tag.toObject({ getter: true }))});
};

const createTag = async (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return next(new HttpError('Invalid input passed, please check your data.', 422));
  }
  const { name } = req.body;
  let existingTag;
  try{
    existingTag = await Tag.findOne({ name: name });
  }catch(err){
    const error = new HttpError('Create a tag failed, please try again!', 500);
    return next(error);
  }
  if(existingTag){
    const error = new HttpError('Tag exists already!', 422);
    return next(error);
  }
  const newTag = new Tag({ name, posts: [] });

  try{
    await newTag.save();

  }catch(err){
    const error = new HttpError('Save the tag failed, please try again!', 500);
    return next(error);
  }

  res.status(201).json({ name: newTag.name, posts: newTag.posts });
};

exports.getTags = getTags;
exports.createTag = createTag;

