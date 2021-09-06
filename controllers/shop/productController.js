const products = require('../../data/mainproducts');
const featuredProducts = require('../../data/products');


exports.productsView  = async(req, res, next) => {
    let catName = req.params.name;

    if (catName) {
        catName = catName.toUpperCase().toString();
        const catProducts = products.filter(prod => {
          console.log(prod.brand.toUpperCase());
           return prod.color.toUpperCase() === catName || prod.brand.toUpperCase() === catName;
        });
        console.log(catProducts);
        res.render('shop/products', { 
        title: 'Strands & More',
        products: catProducts
      });
    } else {
        res.render('shop/products', { 
        title: 'Shop Home', 
        products
      });
    }

    
}

exports.singleProductView = async(req, res) => {
    const prodId = parseInt(req.params.id);
    
    let product = products.filter( prod => {
      return prod.id === prodId;
    });
    product = product[0]
    console.log(product);
    const relatedProducts = products.filter(prod => prod.id < 5);
    res.render('shop/product-details', { 
      title: 'Product Detail', 
      product, 
      relatedProducts}
      );
};