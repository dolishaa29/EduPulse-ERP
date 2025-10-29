let express=require("express");
const { salaryregister, salarydelete, salaryupdate, salaryview, viewbyid } = require("../controller/salarycontroller");
let router=express.Router();

router.post('/salaryregister',salaryregister);
router.get('/salaryview',salaryview);
router.put('/salaryupdate/:id',salaryupdate);
router.delete('/salarydelete/:id',salarydelete);
router.get("/viewbyid/:id",viewbyid);

module.exports=router;