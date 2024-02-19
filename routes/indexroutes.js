const express = require('express');

const routes = express.Router();
const usercontroler = require('../controllers/usercontroler')
const categorycontroler = require('../controllers/categorycontroler')
const subcategorycontroller = require('../controllers/subcategorycontroller')
const productcontroller = require('../controllers/productcontroller')
const addtocartcontroller = require('../controllers/addtocartcontroller'); 
const passport = require('passport');
const multer = require('multer');
const { verifytoken, adminrole  } = require('../middleware/verifyToken ');
const { verify } = require('jsonwebtoken');


const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        return cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        return cb(null,file.originalname)
    }
})

const imageUpload = multer({storage : storage}).single('image');

//user
routes.post('/register',usercontroler.register)
routes.post('/login',usercontroler.login)
routes.post('/changepassword',verifytoken,usercontroler.changepassword)

//category
routes.post('/categoryadd',verifytoken,adminrole(["admin","manager","submanager"]),categorycontroler.categoryadd)
routes.get('/categoryview',verifytoken,adminrole(["admin","manager"]),categorycontroler.categoryview)

routes.delete('/categorydelete',verifytoken,adminrole(["admin"]),categorycontroler.categorydelete);
routes.put('/categoryupdate',verifytoken,adminrole(["admin","manager"]),categorycontroler.categoryupdate)
routes.post('/categoryactive',verifytoken,adminrole(["admin"]),categorycontroler.categoryactive)
routes.post('/categoryinactive',verifytoken,adminrole(["admin"]),categorycontroler.categoryinactive)
routes.get('/admincategory',verifytoken,adminrole(["admin"]),categorycontroler.admincategory)

//subcategory

routes.post('/subcategoryadd',verifytoken,adminrole(["admin","manager"]),subcategorycontroller.subcategoryadd)
routes.get('/subcategoryview',verifytoken,adminrole(["admin","manager"]),subcategorycontroller.subcategoryview);
routes.delete('/subcategorydelete',verifytoken,adminrole(["admin"]),subcategorycontroller.subcategorydelete);
routes.put('/subcategoryupdate',verifytoken,adminrole(["admin","manager"]),subcategorycontroller.subcategoryupdate)

routes.post('/subcategoryactive',verifytoken,adminrole(["admin"]),subcategorycontroller.subcategoryactive)
routes.post('/subcategoryinactive',verifytoken,adminrole(["admin"]),subcategorycontroller.subcategoryinactive)
routes.get('/adminsubcategory',verifytoken,adminrole(["admin"]),subcategorycontroller.adminsubcategory)



routes.post('/productadd',verifytoken,adminrole(["admin","manager"]),imageUpload,productcontroller.productadd);
routes.get('/productview',verifytoken,adminrole(["admin","manager"]),productcontroller.productview)
routes.delete('/productdelete',verifytoken,adminrole(["admin"]),productcontroller.productdelete)
routes.put('/productupdate',adminrole(["admin","manager"]),imageUpload,productcontroller.productupdate)

routes.post('/productactive',verifytoken,adminrole(["admin"]),productcontroller.productactive)
routes.post('/productinactive',verifytoken,adminrole(["admin"]),productcontroller.productinactive)
routes.get('/adminproduct',verifytoken,adminrole(["admin"]),productcontroller.adminproduct)


//addtocart

routes.post('/addtocart',verifytoken,addtocartcontroller.addtocart)
routes.get('/cartview',verifytoken,addtocartcontroller.cartview)
routes.get('/cartdelete',verifytoken,addtocartcontroller.cartdelete);
routes.put('/cartupdate',verifytoken,addtocartcontroller.cartupdate)

module.exports = routes;