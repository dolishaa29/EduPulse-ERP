let express= require("express");
const { addnotice, viewnotice, deletenotice } = require("../controller/noticecontroller");
let router = express.Router();  
router.post('/addnotice', addnotice);
router.get('/viewnotice', viewnotice);
router.delete('/deletenotice/:id', deletenotice);
module.exports = router;
