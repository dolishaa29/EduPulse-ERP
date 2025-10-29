let TransportCondition = require("../models/transport"); 
exports.transportcreate = async (req, res) => {
  console.log("Request Body:", req.body); 
  try {
    let conditionName=req.body.conditionName;
    let status=req.body.status;
    let routeName=req.body.routeName;
    let routeDetails=req.body.routeDetails;
    let driverName=req.body.driverName;
    let driverContact=req.body.driverContact;
    let licenseNumber=req.body.licenseNumber;
    let busType=req.body.busType;
    let busCapacity=req.body.busCapacity;
    let busNumber=req.body.busNumber;
      let rec = new TransportCondition({
      conditionName:conditionName,
      status:status,
      routeName:routeName,
      routeDetails:routeDetails,
      driverName:driverName,
      driverContact:driverContact,
      licenseNumber:licenseNumber,
      busType:busType,
      busCapacity:busCapacity,
      busNumber:busNumber
    });

    await rec.save();

    res.status(201).json({
      success: true,
      msg: "Transport condition created successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "not" });
  }
};

exports.transportview = async (req, res) => {
  try {
    const conditions = await TransportCondition.find();
    console.log(conditions);
    if (conditions.length === 0) {
      return res.status(404).json({ success: false, msg: "No transport conditions found" });
    }
    res.status(200).json({
      success: true,
      transport: conditions,
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


exports.transport = async (req, res) => {
  const { id } = req.params;
  try {
    const condition = await TransportCondition.findById(id);
    if (!condition) {
      return res.status(404).json({ success: false, msg: "Transport condition not found" });
    }
    res.status(200).json({
      success: true,
      data: condition,
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};



exports.transportdelete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCondition = await TransportCondition.findByIdAndDelete(id);
    if (!deletedCondition) {
      return res.status(404).json({ success: false, msg: "Transport condition not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Transport condition deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
