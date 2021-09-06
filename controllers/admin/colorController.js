const {Product} = require('../../models/Product');
const {Color} = require('../../models/Color');
const {textToSentenceCase } = require('../../helpers/helpers');

exports.colors = async(req, res) => {
    if (req.method === 'GET') {
        
        return res.render('admin/colors/add',{
            layout: 'admin',
        })
    } else if(req.method === 'POST'){
       let  {
            colorName
        } = req.body;
        if (!colorName || colorName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/colors/add');
        }
        colorName = textToSentenceCase(colorName);
        const newColor = new Color({
            colorName: colorName
        });
        await newColor.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
exports.colorEdit = async(req, res) => {
    if (req.method === 'GET') {
        const id = req.params.id;
        const color = await Color.findOne({_id : id}).lean().exec();
        return res.render('admin/colors/edit',{
            layout: 'admin',
            color
        })
    } else if(req.method === 'POST'){
       let  {
            _id,colorName
        } = req.body;
        if (!colorName || colorName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/colors/add');
        }
        colorName = textToSentenceCase(colorName);
        let color = await Color.findOne({_id : _id}).exec();
        color.colorName = colorName;
        await color.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
