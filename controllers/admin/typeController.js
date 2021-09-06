const {Product} = require('../../models/Product');
const {HairType} = require('../../models/Types');
const {textToSentenceCase } = require('../../helpers/helpers');

exports.types = async(req, res) => {
    if (req.method === 'GET') {
        
        return res.render('admin/types/add',{
            layout: 'admin',
        })
    } else if(req.method === 'POST'){
       let  {
            typeName
        } = req.body;
        if (!typeName || typeName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/types/add');
        }
        typeName = textToSentenceCase(typeName);
        const newTypes = new HairType({
            typeName: typeName
        });
        await newTypes.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
exports.typeEdit = async(req, res) => {
    if (req.method === 'GET') {
        const id = req.params.id;
        const hairtype = await HairType.findOne({_id : id}).lean().exec();
        return res.render('admin/types/edit',{
            layout: 'admin',
            hairtype
        })
    } else if(req.method === 'POST'){
       let  {
            _id,typeName
        } = req.body;
        if (!typeName || typeName === '') {
            req.flash('error', 'input should not be empty');
            return res.redirect('/strand/admin/types/add');
        }
        typeName = textToSentenceCase(typeName);
        let hairtype = await HairType.findOne({_id : _id}).exec();
        bundle.typeName = typeName;
        await hairtype.save()
        return res.redirect('/strand/admin/products/settings');
    }
};
