
let notice = require("../models/notice");

exports.addnotice = async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let eventDate = req.body.eventDate;
    let issueDate = req.body.issueDate;
  
  let data = new notice({ title:title, content:content, eventDate:eventDate, issueDate:issueDate });
  await data.save();
  
  return res.status(201).json({ success: true, msg: "Notice got registered" });
};

exports.viewnotice = async (req, res) => {
  let noticelist = await notice.find();
  
  if (noticelist.length == 0) {
    return res.status(404).json({ success: false, msg: "No notice found" });
  }
  
  return res.status(200).json({
    success: true,
    msg: "All notices fetched successfully",
    notices: noticelist,
  });
};

exports.deletenotice = async (req, res) => {
  let id = req.params.id;
  await notice.deleteOne({ _id: id });
  
  return res.status(200).json({ success: true, msg: "Deleted successfully!!" });
};
