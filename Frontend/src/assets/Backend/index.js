let express=require("express");
let path=require("path");
let app=express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
let cors=require('cors');

let {erp}=require("./dbconnection");
erp();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/public')));

app.use(cors({
  origin:"http://localhost:5173",
  methods:["POST","GET","DELETE","PUT"],
  credentials:true,
}));
app.use("/",require("./router/adminrouter"));
app.use("/",require("./router/staffrouter"));
app.use("/",require("./router/departmentrouter"));
app.use("/",require("./router/salaryrouter"));
app.use("/",require("./router/studentrouter"));
app.use("/",require("./router/attendancerouter"));
app.use("/",require("./router/studentattendance"));
app.use("/",require("./router/formrouter"));
app.use("/",require("./router/libraryrouter"));
app.use("/",require("./router/transportrouter"));
app.use("/",require("./router/noticerouter"));
app.use("/",require("./router/assignmentrouter"));
app.use("/",require("./router/feedbackrouter"));
const PORT=7000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});