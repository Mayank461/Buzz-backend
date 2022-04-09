const router = require('express').Router();
const post = require('../controllers/post.controller');

router.post('/userPost', post.updatePost);
router.get('/getPost', post.getPost);
router.post('/like',post.like);
router.post('/unlike',post.unlike);



module.exports = router;
