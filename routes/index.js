var express = require('express');
var router = express.Router();
const featuredProducts = require('../data/products');
const products = require('../data/mainproducts');
const brands = require('../data/brands');
const colors = require('../data/colors');

/* GET home page. */
router.use(function (req, res, next) {
  res.locals.brands = brands
  res.locals.colors = colors
  next()
})
router.get('/', function(req, res, next) {
  console.log(featuredProducts)
  res.render('index', { title: 'Welcome To Strand Hair', featuredProducts : featuredProducts });
});
router.get('/login', function(req, res, next) {
  res.render('auth/login', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('auth/register', { title: 'Express' });
});
router.get('/shop', function(req, res, next) {
  res.render('shop/products', { title: 'Shop Home', products: products});
});
router.get('/shop', function(req, res, next) {
  res.render('shop/products', { title: 'Shop Home', products: products});
});
router.get('/shop/product/:id', function(req, res, next) {
  const prodId = parseInt(req.params.id);
  
  const product = products.filter( prod => {
    return prod.id === prodId;
  });

  const relatedProducts = products.filter(prod => prod.id < 5);
  res.render('shop/product-details', { title: 'Product Detail', product: product[0], relatedProducts});
});
router.get('/shop/color/:color', function(req, res, next) {
  res.render('shop/products', { title: 'Shop Home', products: products});
});
router.get('/shop/brands/:brand', function(req, res, next) {
  res.render('shop/products', { title: 'Shop Home', });
});
router.get('/shop/cart', function(req, res, next) {
  res.render('shop/cart', { title: 'Cart', products : featuredProducts });
});
router.get('/shop/checkout', function(req, res, next) {
  res.render('shop/checkout', {title: 'Checkout' });
});


module.exports = router;
