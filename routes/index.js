const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const updateUser = require('./update');

router.use('/auth', authRouter);
router.use('/user',userRouter)
router.use('/update',updateUser);

module.exports = router;
