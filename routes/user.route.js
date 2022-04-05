const router = require('express').Router();
const user = require('../controllers/user.controller');

router.get('/', user.getAll);

router.post('/sendRequest/:id', user.sendRequest);
router.post('/confirmRequest/:id', user.confirmRequest);
router.post('/deleteRequest/:id', user.deleteOrCancelRequest);

router.post('/updateUser/:id', user.updateProfile);

module.exports = router;
