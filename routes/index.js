var express = require('express');
var router = express.Router();
const indexController = require('../controllers/shop/indexController');
const productController = require('../controllers/shop/productController');
const cartController = require('../controllers/shop/cartController');
const products = require('../data/mainproducts');
const brands = require('../data/brands');
const colors = require('../data/colors');

/* GET home page. */
router.use(function (req, res, next) {
  res.locals.brands = brands
  res.locals.colors = colors
  next()
});

router.get('/', indexController.shopHome);

router.get('/shop', productController.productsView);
router.get('/shop/product/:id', productController.singleProductView);

router.get('/shop/color/:name', productController.productsView);
router.get('/shop/brands/:name', productController.productsView);


// CART ROUTES
router.get('/shop/cart', cartController.cart);
router.post('/shop/cart/add', cartController.addToCart);
router.get('/shop/checkout', function(req, res, next) {
  res.render('shop/checkout', {title: 'Checkout' });
});


module.exports = router;
