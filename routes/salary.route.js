var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller')
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/calculate/:id',authMiddleware.requireAdmin,controller.getCalculateSalary);
router.post('/calculate/:id',authMiddleware.requireAdmin,controller.postCalculateSalary);
router.get('/listSalary/:id',authMiddleware.requireAuth,controller.listSalary);
router.get('/edit/:id',authMiddleware.requireAdmin,controller.editSalary);
router.post('/edit/:id',authMiddleware.requireAdmin,controller.post_editSalary);

module.exports = router;