let express=require("express");
const {  adddepartment, viewdepartment, deletedepartment, updatedepartment, Dviewbyid } = require("../controller/departmentcontroller");
let router=express.Router();

router.post("/adddepartment",adddepartment);
router.get("/viewdepartment",viewdepartment);
router.delete("/deletedepartment/:id",deletedepartment);
router.put("/updatedepartment/:id",updatedepartment);
router.get("/Dviewbyid/:id",Dviewbyid);


module.exports=router;