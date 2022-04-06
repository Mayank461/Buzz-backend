const router = require('express').Router();
const user = require('../controllers/user.controller');

router.get('/', user.getAll);

router.get('/:id', user.getUser);
router.post('/sendRequest/:id', user.sendRequest);
router.post('/confirmRequest/:id', user.confirmRequest);
router.post('/deleteRequest/:id', user.deleteOrCancelRequest);

router.post('/updateUser', user.updateProfile);

router.get('/suggestions/:id', user.suggestUsers);

module.exports = router;
