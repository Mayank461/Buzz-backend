const router = require('express').Router();
const chat = require('../controllers/chat.controller');
const authCheck = require('../middlewares/authCheck');

router.post('/send', authCheck, chat.sendMessage);
router.get('/getMyRooms', authCheck, chat.getMyRooms);

module.exports = router;
