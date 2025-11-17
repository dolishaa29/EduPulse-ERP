let studentmodel=require("../models/student");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    if (req.cookies.emstoken != undefined && req.cookies.emstoken != "") {
      const token = req.cookies.emstoken;
      
      const data = jwt.verify(token, "abbc");
      let student= await studentmodel.findOne({ email: data.token });
      
      if (!student) return res.status(403).json({ msg: "User not found" });
      else{
      req.student = student;
      next();
      }
    } 
    else {
      console.log("Please Login First");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
}

module.exports = auth;
