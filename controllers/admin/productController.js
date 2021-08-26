
exports.products = async(req, res) => {
    res.render('admin/products/index',{
        layout: 'admin'
    })
};
exports.productsAdd = async(req, res) => {
    res.render('admin/products/add',{
        layout: 'admin'
    })
};