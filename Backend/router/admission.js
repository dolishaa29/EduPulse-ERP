let express=require("express");
let router=express.Router();
const multer = require("multer");
let upload =multer({ 
    storage:multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null,"./public/images");
        },
        filename:(req,file,cb)=>{
            cb(null, file.originalname);
        }
    })
})
const { admission} = require("../controller/admissioncontroller");
router.post("/admission",upload.single("image"),admission);