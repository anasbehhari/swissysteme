const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "./public/uploads/images",
    filename: function (req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
//init 
const upload = multer({
    storage:storage,
    fileFilter: function(req,file,cb){
     checkfileType(file,cb)
    }
}).single("ImageUpload")

function checkfileType(file,cb) {
    const fileTypes = /jpeg|jpg|png|svg|eps/;
    const extname  = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = fileTypes.test(file.mimeType)
    if(mimeType && extname ) {
        return cb(null,true)
    }
    else {
        cb("Error: Images Only ")
    }

    
}

module.exports = upload;