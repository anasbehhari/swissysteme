const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({

    brandName : {
        type:String,
        required:true
    },
    brandImage : {
        type:"String",
        required:true
    }
})


const Brand = mongoose.model('Brand',BrandSchema);

module.exports = Brand;