const mongoose = require('mongoose');

const productschema = mongoose.Schema({
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
    
    status : {
        type : String,
        default : 1
    }
})

const product = mongoose.model('product',productschema);
module.exports = product;