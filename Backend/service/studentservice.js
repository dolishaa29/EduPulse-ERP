let rec = require("../models/student");
let jwt = require("jsonwebtoken");
let bct = require("bcryptjs");

exports.studentregister = async (req, res) => {
  console.log("req", req.body);
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let dob=req.body.dob;
  let contact = req.body.contact;
  let city = req.body.city;
  let address = req.body.address;
  let image = req.file.filename;
  
  let hp = await bct.hash(password, 10);
  let exist = await rec.findOne({ email: email });
  if (exist) {
    return res.status(400).json({ success: false, msg: "student already exist" });
  } else {
    let data = await rec.find();
    if (data.length == 0) {
      const id = 1;
      let record = new rec({email: email,password: hp,contact: contact,city: city,name: name,dob:dob,address: address,id: id,image: image});
      await record.save();
      return res.status(201).json({ success: true, msg: "student registered successfully" });
    } else {
      const id = data.length + 1;
      let record = new rec({email: email,password: hp,contact: contact,city: city,name: name,dob:dob,address: address,id: id,image: image});
      await record.save();
      return res.status(201).json({ success: true, msg: "student registered successfully" });
    }
  }
};


exports.studentlogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let data = await rec.findOne({ email: email });
  if (!data) {
    return res.status(404).json({ success: false, msg: "student not found" });
  }
  lpass = data.password;
  pass = await bct.compare(password, lpass);
  if (pass) {
    let token = jwt.sign({ token: data.email }, "aabb", {
      expiresIn: "1d",
    });
    res.cookie("emtoken", token);
    console.log("send token" + token);
    return res.status(200).json({ success: true, msg: "student login successfully", token });
  } else {
    return res.status(400).json({ success: false, msg: "student login failed" });
  }
};




exports.viewstudent = async (req, res) => {
  let studentlist = await rec.find();
 
  if (studentlist.length === 0) {
    return res.status(404).json({ success: false, msg: "No student found" });
  }

  return res.status(200).json({
    success: true,
    msg: "All student details fetched successfully",
    student: studentlist,
  });
};


exports.deletestudent = async (req, res) => {
  console.log("hello");
  let id = req.params.id;
  await rec.deleteOne({ _id: id });
  return res.status(200).json({ success: true, msg: "delete successfully!!" });
};

exports.updatestudent = async (req, res) => {
  console.log("hiiii");

  let id = req.params.id;
  let updatedData = req.body;
  console.log("id--", id, req.body);
  
  let record = await rec.findByIdAndUpdate({ _id: id },{ updatedData}, {new: true});

  if (!record) {
    return res.status(404).json({ success: false, msg: "student not found" });
  }
  console.log(record);

  return res.status(200).json({success: true,msg: "student updated successfully",student: record});
};


exports.studentprofile = async (req, res) => {
  let student=req.student;
  return res
    .status(200)
    .json({
      success: true,
      msg: "student profile fetched successfully",
      profile:{ email: student.email,
        name:student.name,
        contact: student.contact,
        city: student.city,
        address: student.address,
        id: student.id,
        image: student.image,
        dob:student.dob,},
    });
};


exports.Sviewbyid=async(req,res)=>
{ 
  console.log("hi");
  try {
    const studentId = req.params.id;
    console.log(studentId);
    let student = await rec.findById(studentId);
    console.log(student);
    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Student details fetched successfully",
      student: student,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
}