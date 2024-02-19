const subcategorymodel = require('../models/subcategorymodel ');
const productmodel = require('../models/productmodel')

const subcategoryadd = async(req,res) => {
    try{

        let duplicate = await subcategorymodel.findOne({subcategory : req.body.subcategory});

        if(duplicate){
            return res.status(401).send({
                success : false,
                message : "subcategory allready exist please enter different subcategory"
            })
        }

        let record = await  subcategorymodel.create({
            categoryid : req.body.category,
            subcategory : req.body.subcategory,
        })

        return res.status(200).send({
            success : true,
            message : "subcategory successfully add",
            record
        })

    }catch(err){
       console.log(err);
       return false
    }
}

const subcategoryview = async(req,res) => {
    try{
        let all = await subcategorymodel.find({status : 1}).populate('categoryid');

        return res.status(202).send({
            success : true,
            message : "succefully view subcategory ",
            all
        })

    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategorydelete = async(req,res) => {
    try{
        let del = await subcategorymodel.findByIdAndDelete(req.query.id);
        await productmodel.deleteMany({subcategoryid : req.query.id})
        return res.status(202).send({
            success : true,
            message : "subcategory successfully deleted"
        })
    }catch(err){
        console.log(err);
        return false
    }
}

 const subcategoryupdate = async(req,res) => {
    try{
        let id = req.query.id;

        let all = await subcategorymodel.findByIdAndUpdate(id,{
            categoryid : req.body.category,
            subcategory : req.body.subcategory
        })

        return res.status(202).send({
            success : true,
            message : "subcategory successfully updated",
           
        })

    }catch(err){
        console.log(err);
        return false
    }
 }

const subcategoryactive = async(req,res) => {
    try{
        let id = req.query.id;
        console.log(req.body.status);
        let active = await subcategorymodel.findByIdAndUpdate(id,{
            status : req.body.status
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

const subcategoryinactive = async( req,res) => {
    try{
        let id = req.query.id;
        
        let active = await subcategorymodel.findByIdAndUpdate(id,{
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

const adminsubcategory = async(req,res) => {
    try{
        let active = await subcategorymodel.find({status : 1});
        let inactive = await subcategorymodel.find({status : 0});

        return res.status(200).send({
            success : true ,
            message : "all subcategory",
            active : active,
            inactive : inactive
        })

    }catch(err){
        console.log(err);
        return false
    }
}

module.exports = {
    subcategoryadd,subcategoryview,subcategorydelete,subcategoryupdate,subcategoryactive,adminsubcategory,subcategoryinactive
}