const products = require('../../data/mainproducts');
const featuredProducts = require('../../data/products');



exports.cart = async(req, res) => {
    res.render('shop/cart', { 
        title: 'Cart', 
        products : featuredProducts });
};
exports.addToCart = async(req, res) => {
    let {productId,quantity} = req.body;
    console.log(req.body);
    try {
            let product = products.filter( prod => {
              return prod.id.toString() === productId.toString();
            });
            product = product[0];
            
            // console.log(newProduct);
            // return res.json(product);
            if (req.session.cart === undefined) {
                req.session.cart = {
                    items: [],
                    itemsTotal: '',
                    buyId: ''
                };
                let newProduct = product;
                    newProduct.total =parseInt(product.price) * parseInt(quantity);
                req.session.cart.items.push(newProduct);
                return res.json({message: 'product added'});
             } else {
                let cartItems = req.session.cart.items;
                const productExist = cartItems.find(item => {
                    return item.id.toString() === product.id.toString()
                });

                if (productExist) {
                    //console.log(items);
                    //console.log("--------------------");
                    items = cartItems.map(item => {
                        if (item.id.toString() === product.id.toString() ) {
                            item.quantity = quantity;
                            item.total = parseInt(item.price) * parseInt(item.quantity);;
                            return item
                            } else{
                                return item;
                            }
                        }); 
                        req.session.cart.items = items;
                        return res.json({message: 'product updated'});
                    } else {
                        let newProduct = product;
                        newProduct.total = parseInt(product.price) * parseInt(quantity);;
                        req.session.cart.items.push(newProduct);
                        return res.json({message: 'product added'})
                    }
                    }
            } catch(e) {
                // statements
                console.log(e);
            }
            
    
};