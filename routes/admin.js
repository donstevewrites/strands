const express = require('express');
const router = express.Router();
const productController = require('../controllers/admin/productController');
const colorController = require('../controllers/admin/colorController');
const bundleController = require('../controllers/admin/bundleController');
const typeController = require('../controllers/admin/typeController');

//middleware 
const { addProductValidation,validate } = require('../middlewares/validation/addProductValidation');
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  res.render('admin/index',{
      layout: 'admin'
  })
});
// manage products

router.get('/products', productController.products);
router.get('/products/settings', productController.settings);
router.get('/products/add', productController.productsAdd);
router.post('/products/add',addProductValidation,validate, productController.productsAdd);
router.get('/products/edit/:id', productController.productEdit);
router.post('/products/edit', productController.productEdit);
//add brands
router.get('/brands/add', productController.brands);
router.post('/brands/add', productController.brands);
router.get('/brands/edit/:id', productController.brandEdit);
router.post('/brands/edit', productController.brandEdit);
//add colors
router.get('/colors/add', colorController.colors);
router.post('/colors/add', colorController.colors);
router.get('/colors/edit/:id', colorController.colorEdit);
router.post('/colors/edit', colorController.colorEdit);
//add bundles
router.get('/bundles/add', bundleController.bundles);
router.post('/bundles/add', bundleController.bundles);
router.get('/bundles/edit/:id', bundleController.bundleEdit);
router.post('/bundles/edit', bundleController.bundleEdit);
//add types
router.get('/types/add', typeController.types);
router.post('/types/add', typeController.types);
router.get('/types/edit/:id', typeController.typeEdit);
router.post('/types/edit', typeController.typeEdit);




module.exports = router;
