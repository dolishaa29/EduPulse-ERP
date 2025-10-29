let express=require("express");
const {addfeedback,viewfeedback } = require("../controller/feedback");
let router=express.Router();

router.post("/addfeedback",addfeedback);
router.get("/viewfeedback",viewfeedback);



module.exports=router;