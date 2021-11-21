const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const authorControllers = require('../controllers/author-controllers');


router.get('/api/authors', authorControllers.getAuthors);
router.post('/api/author',
[
  check('name').not().isEmpty(),
  check('short_intro').not().isEmpty()

],
authorControllers.createAuthor);

module.exports = router;