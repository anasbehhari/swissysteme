const mongoose = require("mongoose")
const moment = require("moment")
const ContactFormSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    }
    ,fullName: {
        type: String,
        required: true
    }
    ,email: {
        type: String,
        required:true
    }
    ,objet : {
        type:String,
        required:true
    }
    ,howFind : {
        type:String,
        required:true
    }
    ,message: {
        type:String,
        required:true
    },
    favorite : {
        type: Boolean,
        default:false,
        required: true 
    },
    date: {
        type:String
    },
    deleted : {
        type: Boolean,
        default: false,
        required: true 
    }

})


const ContactForm = mongoose.model('Contact',ContactFormSchema);

module.exports = ContactForm;