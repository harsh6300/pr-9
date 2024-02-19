const usermodel = require('../models/usermodel')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const register = async(req,res) => {
   try{

        let all = await usermodel.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        return res.status(200).send({
            success : true,
            message : "uer successfully register",
            all 
        })

   }catch(err){
    console.log(err);
    return false
   }
}

const login = async(req,res) => {
    try{    
        let user = await usermodel.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(200).send({
                success : true,
                message : "email and password not matched"
            })
        }
        let token = jwt.sign({user : user},"user",{expiresIn : '24hr'})
        console.log(user);
        return res.status(200).send({
            success : true,
            message : "user successfully login",
            token
        })
    }catch(err){
        console.log(err);
        return false
    }
}

const changepassword = async(req,res) => {
    try{    
        let id = req.query.id
        let email = req.body.email;
        let password = req.body.password;
        let cpassword =  req.body.conformpassword;
        
        let user =  await usermodel.findOne({email : email});
        if(!user){
            return res.status(402).send({
                success : false,
                message : "email is not valid"
            })
        }
        if(password != cpassword) {
            return res.status(402).send({
                success : false,
                message : "password and conform password are not match"
            })
        }

        let update = await usermodel.findByIdAndUpdate(id,{
            password : password
        })
        return res.status(200).send({
            success : true,
            message : "password successfully updated",
            
        })

    }catch(err){
        console.log(err);
        return false
    }
}

module.exports = {
    register,login,changepassword
}