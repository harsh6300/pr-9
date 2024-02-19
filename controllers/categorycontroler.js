const categorymodel = require('../models/categorymodel');
const subcategorymodel  = require('../models/subcategorymodel ')
const productmodel  = require('../models/productmodel')

const categoryadd = async(req,res) => {
    try{

        let duplicate = await categorymodel.findOne({category : req.body.category});

        if(duplicate){
            return res.status(200).send({
                success : true,
                message : "category already exist",
                
            })
        }

        let record = await categorymodel.create({
            category : req.body.category
        })

        return res.status(200).send({
            success : true,
            message : "category successfully add ",
            record
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const categoryview = async(req,res) => {
    try{

        let record = await categorymodel.find({status : 1});
        
        return res.status(201).send({
            success : true,
            message : "all category",
            record
        })

    }catch(err){
        console.log(err);
        return false
    }
}

const categorydelete = async(req,res) => {
    try{
    
        let del = await categorymodel.findByIdAndDelete(req.query.id);


        let all = await subcategorymodel.deleteMany({categoryid : req.query.id})
         await productmodel.deleteMany({categoryid : req.query.id})
        return res.status(201).send({
            success : true,
            message : " category successfully deleted",
            
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const categoryupdate = async(req,res) => {
    try{
        let id = req.query.id;

        let all = await categorymodel.findByIdAndUpdate(id,{
            category : req.body.category
        })
        return res.status(202).send({
            success : true,
            message : "category successfully updated"
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const categoryactive = async( req,res) => {
    try{
        let id = req.query.id;
        
        let active = await categorymodel.findByIdAndUpdate(id,{
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

const categoryinactive = async( req,res) => {
    try{
        let id = req.query.id;
        
        let active = await categorymodel.findByIdAndUpdate(id,{
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

const admincategory = async(req,res) => {
    try{
        let active = await categorymodel.find({status : 1});
        let inactive = await categorymodel.find({status : 0});

        return res.status(200).send({
            success : true ,
            message : "all category",
            active : active,
            inactive : inactive
        })

    }catch(err){
        console.log(err);
        return false
    }
}


module.exports = {
    categoryadd,categoryview,categorydelete,categoryupdate,categoryactive,categoryinactive,admincategory
}