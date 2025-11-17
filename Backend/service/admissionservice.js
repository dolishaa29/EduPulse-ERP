let rec = require("../models/admission");
let rec2=require("../models/feemanagement");
let rec4 = require("../models/feeactivity");
let jwt = require("jsonwebtoken");
let bct = require("bcryptjs");

exports.admission = async (req, res) => {
  console.log("req", req.body);
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let dob=req.body.dob;
  let contact = req.body.contact;
  let city = req.body.city;
  let address = req.body.address;
  let department=req.body.department;
  let basefee=req.body.basefee;
  let hostel=req.body.hostel;
  let library=req.body.library;
  let transport=req.body.transport;
  let totalfee=req.body.totalfee;
  
  let hp = await bct.hash(password, 10);
  let exist = await rec.findOne({ email: email });
  if (exist) {
    return res.status(400).json({ success: false, msg: "student already exist" });
  } else {
    let data = await rec.find();
    if (data.length == 0) {
      const id = 1;
      let record = new rec({email: email,password: hp,contact: contact,city: city,name: name,dob:dob,address: address,id: id,department:department,basefee:basefee,hostel:hostel,library:library,transport:transport,totalfee:totalfee});
      let record2=new rec2({studentId:id,studentName:name,email:email,totalFee:totalfee,quarter1:{fees:(totalfee)/4,status:'Overdue'},quarter2:{fees:(totalfee)/4,status:'Overdue'},quarter3:{fees:(totalfee)/4,status:'Overdue'},quarter4:{fees:(totalfee)/4,status:'Overdue'},remainingFee:totalfee});
      await record.save();
      await record2.save();
      return res.status(200).json({ success: true, msg: "student registered successfully" });
    } else {
      const id = data.length + 1;
      let record = new rec({email: email,password: hp,contact: contact,city: city,name: name,dob:dob,address: address,id: id,department:department,basefee:basefee,hostel:hostel,library:library,transport:transport,totalfee:totalfee});
      let record2=new rec2({studentId:id,studentName:name,email:email,totalFee:totalfee,quarter1:{fees:(totalfee)/4,status:'Overdue'},quarter2:{fees:(totalfee)/4,status:'Overdue'},quarter3:{fees:(totalfee)/4,status:'Overdue'},quarter4:{fees:(totalfee)/4,status:'Overdue'},remainingFee:totalfee});
      await record2.save();
      await record.save();
      return res.status(200).json({ success: true, msg: "student registered successfully" });
    }
  }
};


exports.admissionlogin = async (req, res) => {
  console.log("2");
  let email = req.body.email;
  let password = req.body.password;
  console.log("login req", req.body);
    let data = await rec.findOne({ email: email });
    console.log("data", data);
  if (!data) {
    return res.status(404).json({ success: false, msg: "student not found" });
  }
    lpass = data.password;
    pass = await bct.compare(password, lpass);
    console.log("3")
    if (pass) {
    let token = jwt.sign({ token: data.email }, "aabb", {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    console.log("send token" + token);
    return res.status(200).json({ success: true, msg: "student login successfully",token});
  } else {
    return res.status(400).json({ success: false, msg: "student login failed" });
  }
};


exports.studentprofile = async (req, res) => {
  console.log("req.adm",req.adm);
  console.log("6")
  let adm=req.adm;
  console.log("adm",adm);
  return res
    .status(200)
    .json({
      success: true,
      msg: "student profile fetched successfully",
      student: {
        email: adm.email,
        name: adm.name,
        contact: adm.contact,
        address: adm.address,
        id: adm.id,
        city: adm.city,
        dob: adm.dob,
        department:adm.department,
        basefee:adm.basefee,
        totalfee:adm.totalfee,
remainingFee:adm.remainingFee,
      },
    });
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


exports.payfee = async (req, res) => {
  const quarter = req.body.quarter; 
  console.log("quarter",quarter);
  const studentId = req.adm.id;    
  console.log("studentId",studentId);
  const totalFee = req.adm.totalfee;
  console.log("totalFee",totalFee);
  const amount = totalFee / 4;     

  try {
    let feeRecord = await rec2.findOne({ studentId: studentId });

    if (!feeRecord) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }
    const selectedquarter = feeRecord[quarter];
    selectedquarter.status = 'Paid';
    selectedquarter.fees = amount;
    feeRecord.remainingFee -= amount;
    await feeRecord.save();

    let feeActivity = new rec4({
      studentId: feeRecord.studentId,
      studentName: feeRecord.studentName,
      quarter: quarter,
      amount: amount,
    });

    await feeActivity.save();

    return res.status(200).json({
      success: true,
      msg: `Fee } paid successfully`,
      remainingFee: feeRecord.remainingFee, 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};


exports.studentprofile2 = async (req, res) => {
  console.log("req.adm",req.adm);
  console.log("6")
  let adm=req.adm;
  console.log("adm",adm);
  data=await rec2.findOne({studentId:adm.id});
  console.log("data",data);
  return res
    .status(200)
    .json({
      success: true,
      msg: "student profile fetched successfully",
      student: data,
    });
};