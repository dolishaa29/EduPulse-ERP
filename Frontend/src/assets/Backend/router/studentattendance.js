let express=require("express");
const { stuaddattendance, stuviewattendance ,attendancecheck} = require("../controller/studentattendance");
let auth=require("../middleware/admin")

let router=express.Router();

router.post("/stuaddattendance",auth,stuaddattendance);
router.get("/stuviewattendance",stuviewattendance);
router.post("/attendancecheck",attendancecheck);
module.exports=router;