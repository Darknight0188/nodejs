var express = require('express');
var router = express.Router();
var controller = require('../controller/customer.controller');

router.get('/register',controller.get_register);
router.post('/register',controller.post_register);
router.get('/login',controller.getLogin);
router.post('/login',controller.postLogin);
router.get('/logout',controller.logout);

module.exports = router;