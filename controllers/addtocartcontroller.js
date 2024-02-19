const productmodel= require('../models/productmodel');
const addtocartmodel = require('../models/addtocartmodel');

const addtocart = async(req,res) => {
    try{

        let product = await productmodel.findById(req.body.productid).populate('categoryid').populate('subcategoryid');
        console.log(product);
        let recode = await addtocartmodel.create({
            userid : req.body.userid,
            categoryid : product.categoryid,
            subcategoryid : product.subcategoryid,
            name : product.name,
            qty : product.qty,
            image : product.image,
        })
        return res.status(200).send({
            success : true,
            message : "product is successfully add to cart",
            recode
        })

    }catch(err){
        console.log(err);
        return false
    }
}

const cartview = async(req,res) => {
    try{

        let cart = await addtocartmodel.find({}).populate('userid').populate('categoryid').populate('subcategoryid');
       console.log(cart);
        let record = cart.filter((val)=>{
            return val.userid.name == req.user.user.name
        })

        return res.status(200).send({
            success : true,
            message : "cart fetch",
            length : record.length,
            record
           
        })

    }catch(err){
        console.log(err);
        return false
    }
}

const cartdelete = async(req,res) => {
    try{
        let id = req.query.id;
        
        let all = await addtocartmodel.findByIdAndDelete(id)

        return res.status(200).send({
            success : true,
            message : "cart is successfully delete"
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const cartupdate = async(req,res)=> {
    try{    

        let id = req.query.id

        let all = await addtocartmodel.findByIdAndUpdate(id,{
            qty : req.body.qty
        })

        return res.status(200).send({
            success : true,
            message : "cart successfully update"
        })

    }catch(err){
        console.log(err);
        return false
    }
}

module.exports = {
    addtocart,
    cartview,
    cartdelete,
    cartupdate
}