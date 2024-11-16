const multer = require('multer')
const path = require('path')

const Mulstorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/ActivityImages/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Keep original extension

    }
})

module.exports = Mulstorage