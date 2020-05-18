var express = require('express')
var router = express.Router();
var controller = require('../controller/cart.controller');
var middleware = require('../middlewares/auth.middleware');
router.get('/',controller.cart);
router.get('/cart',middleware.requireSignin,controller.cartIndex);
router.get('/add/:productId',middleware.requireSignin,controller.addToCart);
router.get('/remove/:productId',middleware.requireSignin,controller.removeFromCart);
router.get('/checkout',middleware.requireSignin,controller.checkOut);
module.exports = router;