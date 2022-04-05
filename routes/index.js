const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const updateUser = require('./update');
const loginUser = require('./loginUser');
const local = require('./localLogin');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/update', updateUser);
router.use('/loginUser', loginUser);

module.exports = router;
