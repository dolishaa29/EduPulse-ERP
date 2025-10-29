let express=require("express");
const { addattendance, viewattendance,attendancecheck } = require("../controller/attendancecontroller");
let auth=require("../middleware/admin")
let router=express.Router();

router.post("/addattendance",auth,addattendance);
router.get("/viewattendance",viewattendance);
router.post("/Sattendancecheck",attendancecheck);


module.exports=router;