const productmodel = require('../models/productmodel')
const fs = require('fs')
const productadd = async (req, res) => {
    try {
        let product = await productmodel.create({
            categoryid: req.body.categoryid,
            subcategoryid: req.body.subcategoryid,
            name: req.body.name,
            qty: req.body.qty,
            image: req.file.path,
        })
        return res.send({
            success: true,
            message: "product successfully add",
            product
        })

    } catch (err) {
        console.log(err);
        return false
    }
}

const productview = async (req, res) => {
    try {
        let record = await productmodel.find({status : 1 }).populate('categoryid').populate('subcategoryid')
        return res.status(200).send({
            success: true,
            message: "product are here",
            record
        })

    } catch (err) {
        console.log(err);
        return false
    }
}

const productdelete = async (req, res) => {
    try {
        let old = await productmodel.findById(req.query.id)
        fs.unlinkSync(old.image)

        let del = await productmodel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            success: true,
            message: "product successfully delete ",
            del
        })

    } catch (err) {
        console.log(err);
        return false
    }
}
const productupdate = async (req, res) => {
    try {
        let id = req.query.id;

        if (req.file) {
            let oldrecord = await productmodel.findById(id)
            fs.unlinkSync(oldrecord.image);

            let record = await productmodel.findByIdAndUpdate(id, {
                categoryid: req.body.categoryid,
                subcategoryid: req.body.subcategoryid,
                name: req.body.name,
                qty: req.body.qty,
                image: req.file.path
            })

            return res.status(200).send({
                success: true,
                message: "product successfully update ",
            })

        } else {
            let oldrecord = await productmodel.findById(id)

            let record = await productmodel.findByIdAndUpdate(id, {
                categoryid: req.body.categoryid,
                subcategoryid: req.body.subcategoryid,
                name: req.body.name,
                qty: req.body.qty,
                image: req.body.iamge
            })
            return res.status(200).send({
                success: true,
                message: "product successfully update ",
                
            })
        }

    } catch (err) {
        console.log(err);
        return false
    }
}

const productactive = async(req,res) => {
    try{
        let id = req.query.id;
        
        let active = await productmodel.findByIdAndUpdate(id,{
            status :0
        })

        return res.status(200).send({
            success : true,
            message : "status successfully change"
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const productinactive = async( req,res) => {
    try{
        let id = req.query.id;
        
        let active = await productmodel.findByIdAndUpdate(id,{
            status :1
        })

        return res.status(200).send({
            success : true,
            message : "status successfully change"
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const adminproduct = async(req,res) => {
    try{
        let active = await productmodel.find({status : 1});
        let inactive = await productmodel.find({status : 0});

        return res.status(200).send({
            success : true ,
            message : "all product",
            active : active,
            inactive : inactive
        })

    }catch(err){
        console.log(err);
        return false
    }
}


module.exports = {
    productadd,
    productview,
    productdelete,
    productupdate,
    productactive,
    productinactive,
    adminproduct
}