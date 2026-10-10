const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', UserController.index);
router.post('/', UserController.store);
router.post('/auth/', UserController.login);
router.get('/profile',verifyToken,UserController.profile);
module.exports = router;