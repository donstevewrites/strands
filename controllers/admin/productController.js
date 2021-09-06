const {Product} = require('../../models/Product');
const {Brand} = require('../../models/Brand');
const {Color} = require('../../models/Color');
const {HairType} = require('../../models/Types');
const {Bundle} = require('../../models/Bundle');
const {textToSentenceCase,convertMongooseData } = require('../../helpers/helpers');

exports.products = async(req, res) => {
    try {
        const products = await Product.find({}).lean().exec();
                res.render('admin/products/index',{
                layout: 'admin',
                products
            })
    } catch(e) {
        // statements
        console.log(e);
    }
    
};
exports.productsAdd = async(req, res) => {
    if (req.method === 'GET') {
        try {
            const brands = await Brand.find({}).lean().exec();
            const colors = await Color.find({}).lean().exec();
            const bundle = await Bundle.find({}).lean().exec();
            const hairtype = await HairType.find({}).lean().exec();

            return res.render('admin/products/add',{
                layout: 'admin',
                brands:brands,
                colors:colors,
                bundle,
                hairtype
            })
        } catch(e) {
            // statements
            console.log(e);
        }
       
    } else if(req.method === 'POST'){
        console.log(req.body);
       const  {
            productName,
            productDesc,
            productPrice,
            productQuantity,
            productBrand,
            productColor,
            productBundle,
            productType
        } = req.body;

        if (!req.files || Object.keys(req.files).length === 0) {
            req.flash('error', 'the product image is not attached');
            return res.redirect('/strand/admin/products/add');
        }
          const productImage = req.files.productImage;
          uploadPath = __dirname + '../../../public/images/products/' + productImage.name;

          try {

                productImage.mv(uploadPath, function(err) {
                if (err){ 
                        console.log(err);  
                        req.flash('error', 'Internal server error');
                        return res.redirect('/strand/admin/products/add');
                    }
                  });

                const newProduct = new Product({
                        name: productName,
                        description: productDesc,
                        price: productPrice,
                        quantity: productQuantity,
                        brand: productBrand,
                        color: productColor,
                        bundle: productBundle,
                        hairType: productType,
                        image: productImage.name
                });
                
                await newProduct.save();
                return res.redirect('/strand/admin/products');
            } catch(e) {
                // statements
                console.log(e);
            }
    }
    
};
exports.productEdit = async(req, res) => {
    if (req.method === 'GET') {
        const id = req.params.id;
        let product = await Product.findOne({_id : id}).lean().exec();
        let brands = await Brand.find({}).lean().exec();
        let colors = await Color.find({}).lean().exec();
        let bundle = await Bundle.find({}).lean().exec();
        let hairtype = await HairType.find({}).lean().exec();
        return res.render('admin/products/edit',{
            layout: 'admin',
            brands:brands,
            colors:colors,
            bundle,
            hairtype,
            product
        });
    } else if(req.method === 'POST'){
       let  {
            _id,
            productName,
            productDesc,
            productPrice,
            productQuantity,
            productBrand,
            productColor,
            productBundle,
            productType
        } = req.body;
        
        let product = await Product.findOne({_id : _id}).exec();

        
        await product.save()
        return res.redirect('/strand/admin/products');
    }
};
exports.settings = async(req, res) => {
    try {
        const brands = await Brand.find({}).limit(5).lean().exec();
        const colors = await Color.find({}).limit(5).lean().exec();
        const bundle = await Bundle.find({}).limit(5).lean().exec();
        const hairtype = await HairType.find({}).limit(5).lean().exec();
        res.render('admin/settings/index',{
        layout: 'admin',
        brands:brands,
        colors:colors,
        bundle,
        hairtype
       })
    } catch (error) {
        
    }
    
};

exports.brands = async(req, res) => {
    if (req.method === 'GET') {
        
        return res.render('admin/brands/add',{
            layout: 'admin',
        })
    } else if(req.method === 'POST'){
       let  {
            brandName
        } = req.body;
        if (!brandName || brandName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/brands/add');
        }
        brandName = textToSentenceCase(brandName);
        const newBrand = new Brand({
            brandName: brandName
        });
        await newBrand.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
exports.brandEdit = async(req, res) => {
    if (req.method === 'GET') {
        const id = req.params.id;
        const brand = await Brand.findOne({_id : id}).lean().exec();
        console.log(brand);
        return res.render('admin/brands/edit',{
            layout: 'admin',
            brand
        })
    } else if(req.method === 'POST'){
       let  {
            _id,brandName
        } = req.body;
        if (!brandName || brandName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/brands/add');
        }
        brandName = textToSentenceCase(brandName);
        let brand = await Brand.findOne({_id : _id}).exec();
        brand.brandName = brandName;
        await brand.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
