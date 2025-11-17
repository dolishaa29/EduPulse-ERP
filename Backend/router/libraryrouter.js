let express=require("express");
let router=express.Router();
let auth=require("../middleware/admission");
let auths=require("../middleware/admin");

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

const { addbook, viewbook, deletebook,issuebook,returnbook,issued } = require("../controller/librarycontroller");
router.post("/addbook",upload.single("image"),addbook);
router.get("/viewbook",viewbook);
router.delete("/deletebook/:id",deletebook);
router.post("/issuebook",auth,issuebook);
router.post("/returnbook",auth,returnbook);
router.get("/issued",auth,issued);

module.exports=router;