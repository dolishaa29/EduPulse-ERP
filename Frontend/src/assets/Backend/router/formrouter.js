let express=require("express");
const { addquestion, viewquestion, updatequestion, deletequestion,checkquestion } = require("../controller/formcontroller");
let router=express.Router();

router.post('/addquestion',addquestion);
router.get('/viewquestion',viewquestion);
router.put('/updatequestion/:id',updatequestion);
router.delete('/deletequestion/:id',deletequestion);
router.post('/checkquestion/:id',checkquestion);
module.exports=router;