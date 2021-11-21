const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const tagControllers = require('../controllers/tag-controllers');


router.get('/api/tags', tagControllers.getTags);
router.post('/api/tag',
[
  check('name').not().isEmpty()
],
tagControllers.createTag);

module.exports = router;