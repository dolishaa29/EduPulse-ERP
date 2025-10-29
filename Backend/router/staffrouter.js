let express=require("express");
let auth=require("../middleware/staff");
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

const { staffregister, stafflogin, staffprofile, stafflogout, viewstaff,deletestaff ,updatestaff,viewbyid} = require("../controller/staffcontroller");
router.post("/staffregister",upload.single("image"),staffregister);
router.post("/stafflogin",stafflogin);
router.get('/staffprofile',auth,staffprofile);
router.get("/stafflogout",stafflogout);
router.get("/viewstaff",auths,viewstaff);
router.delete("/deletestaff/:id",auths,deletestaff);
router.put("/updatestaff/:id",upload.single("image"),updatestaff);
router.get("/viewbyid/:id",viewbyid);
module.exports=router;