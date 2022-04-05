const router = require('express').Router();

router.use('/auth', require('./auth.route'));
router.use('/users', require('./user.route.js'));
router.use('/posts', require('./post.route.js'));

module.exports = router;
