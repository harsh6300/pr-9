const mongoose = require('mongoose');

const subcategoryschema = mongoose.Schema({
    categoryid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategory : {
        type : String,
        required  : true
    },
    status : {
        type : String,
        default : 1
    }
})

const subcategory = mongoose.model('subcategory',subcategoryschema);
module.exports = subcategory;