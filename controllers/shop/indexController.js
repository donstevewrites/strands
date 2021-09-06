const featuredProducts = require('../../data/products');

exports.shopHome = async(req, res) => {
    try {
    res.render('index', 
        { title: 'Welcome To Strands & More', featuredProducts : featuredProducts 
        });
    } catch(e) {
        // statements
        console.log(e);
    }
    
};