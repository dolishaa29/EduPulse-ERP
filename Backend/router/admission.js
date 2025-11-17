let express=require("express");
let auth=require("../middleware/admission");
let auths=require("../middleware/admin");
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

const { admission,admissionlogin,studentprofile,viewstudent,viewbyids,payfee,studentprofile2} = require("../controller/admissioncontroller");
router.post("/admission",admission);
router.post("/admissionlogin",admissionlogin);
router.get("/studentprofile",auth,studentprofile);
router.get("/viewstudent",auths,viewstudent);
router.post("/payfees",auth,payfee);
router.get("/viewbyids/:id",viewbyids);
router.get("/studentprofile2",auth,studentprofile2);

module.exports=router;