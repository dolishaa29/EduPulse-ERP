let staffmodel=require("../models/staff");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    if (req.cookies.emstoken != undefined && req.cookies.emstoken != "") {
      const token = req.cookies.emstoken;
      
      const data = jwt.verify(token, "aabb");
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
