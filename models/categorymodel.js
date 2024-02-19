const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    category : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 1
    }
})

const category = mongoose.model('category',categoryschema);
module.exports = category;