var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller')
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/',authMiddleware.requireAuth,controller.index);

router.get('/create', authMiddleware.requireAdmin,controller.getCreate);

router.post('/create',authMiddleware.requireAdmin,controller.postCreate);

router.get('/:userId/edit',authMiddleware.requireAuth,controller.get_editUser);

router.post('/:userId/edit',authMiddleware.requireAuth,controller.post_editUser);

router.get('/:userId/delete',authMiddleware.requireAdmin,controller.deleteUser);

router.get('/search',authMiddleware.requireAuth,controller.searchUser);

router.get('/changepassword/:id',authMiddleware.requireAuth,controller.get_changePassword);

router.post('/changepassword/:id',authMiddleware.requireAuth,controller.post_changePassword);


module.exports = router;