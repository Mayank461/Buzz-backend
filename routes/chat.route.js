const router = require('express').Router();
const chat = require('../controllers/chat.controller');

router.post('/send', chat.sendMessage);
router.get('/getByRoomID/:roomID', chat.getChatByRoomID);

module.exports = router;
