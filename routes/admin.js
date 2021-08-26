const express = require('express');
const router = express.Router();
const productController = require('../controllers/admin/productController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/index',{
      layout: 'admin'
  })
});

router.get('/products', productController.products);
router.get('/products/add', productController.productsAdd);

module.exports = router;
