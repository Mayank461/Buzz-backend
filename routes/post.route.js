const router = require('express').Router();
const post = require('../controllers/post.controller');

router.post('/userPost', post.updatePost);

module.exports = router;
