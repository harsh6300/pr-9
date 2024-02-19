const mongoose = require('mongoose');

const addtocartschema = mongoose.Schema({
    categoryid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    name : {
        type : String,
        require : true
    },
    qty : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    },  
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    status : {
        type : String,
        default : 1
    }
})

const Addtocart = mongoose.model('Addtocart',addtocartschema);
module.exports = Addtocart;