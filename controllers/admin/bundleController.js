const {Product} = require('../../models/Product');
const {Bundle} = require('../../models/Bundle');
const {textToSentenceCase } = require('../../helpers/helpers');

exports.bundles = async(req, res) => {
    if (req.method === 'GET') {
        
        return res.render('admin/bundle/add',{
            layout: 'admin',
        })
    } else if(req.method === 'POST'){
       let  {
            bundleName
        } = req.body;
        if (!bundleName || bundleName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/bundles/add');
        }
        const newBundle = new Bundle({
            bundleName: bundleName
        });
        await newBundle.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
exports.bundleEdit = async(req, res) => {
    if (req.method === 'GET') {
        const id = req.params.id;
        const bundle = await Color.findOne({_id : id}).lean().exec();
        return res.render('admin/colors/edit',{
            layout: 'admin',
            bundle
        })
    } else if(req.method === 'POST'){
       let  {
            _id,bundleName
        } = req.body;
        if (!bundleName || bundleName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/bundles/add');
        }
        let bundle = await Color.findOne({_id : _id}).exec();
        bundle.bundleName = bundleName;
        await bundle.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
