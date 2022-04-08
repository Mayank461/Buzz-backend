const router = require('express').Router();
const post = require('../controllers/post.controller');

router.post('/userPost', post.updatePost);
router.post('/like',post.like);
router.post('/unlike',post.unlike);
router.post('/comment',post.comment);


module.exports = router;
