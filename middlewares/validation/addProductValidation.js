const { validationResult } = require('express-validator');
const { check } = require('express-validator');

// validation middlwares

exports.addProductValidation = [
    check('productName').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productDesc').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productPrice').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productQuantity').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productBrand').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productColor').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productBundle').not().isEmpty().trim().withMessage('required fields should not be empty'),
    check('productType').not().isEmpty().trim().withMessage('required fields should not be empty'),
 
];


// middleware for checking validation errors

exports.validate = (req, res,next) => {
    const {errors } = validationResult(req);
        if (errors && errors.length > 1) {
            let error = errors[0].msg;
            req.flash('error', error);
            return res.redirect('/strand/admin/products/add');
    }
    next();
};