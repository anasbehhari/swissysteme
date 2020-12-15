const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true
    }
    ,
    productCategorie: {
        type: String,
        required: true
    }
    ,
    productDescription: {
        type: String,
        required: true
    }
    ,
    productImage:{
        type:String,
        required:true
    },
    productDate: {
        type: Date,
        default: Date.now
    },
    productPartners : {
        type:Object,
        required:true
    }

})


const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;