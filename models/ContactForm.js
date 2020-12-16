const mongoose = require("mongoose")

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
    ,interest : {
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
        type:Date,
        default:Date.now()
    },
    deleted : {
        type: Boolean,
        default: false,
        required: true 
    }

})


const ContactForm = mongoose.model('Contact',ContactFormSchema);

module.exports = ContactForm;