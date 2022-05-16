const router = require('express').Router();

router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route'));
router.use('/posts', require('./post.route'));
router.use('/chat', require('./chat.route'));

module.exports = router;
