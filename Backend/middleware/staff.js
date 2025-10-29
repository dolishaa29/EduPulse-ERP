let staffmodel=require("../models/staff");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    if (req.cookies.emtoken != undefined && req.cookies.emtoken != "") {
      const token = req.cookies.emtoken;
      
      const data = jwt.verify(token, "aabc");
      let staff= await staffmodel.findOne({ email: data.token });
      
      if (!staff) return res.status(403).json({ msg: "User not found" });
      else{
      req.staff = staff;
      next();
      }
    } else {
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
