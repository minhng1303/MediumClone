const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const postController = require('../controllers/post-controllers');

router.get('/api/posts', postController.getPosts);
// router.get('/api/post/:postId', postController.getPostById);
router.post('/api/post', postController.createPost);

module.exports = router;