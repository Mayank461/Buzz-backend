const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const updateUser = require('./update');
const userPost = require('./userPost');

router.use('/auth', authRouter);
router.use('/user',userRouter)
router.use('/update',updateUser);
router.use('/userPost',userPost);

module.exports = router;
