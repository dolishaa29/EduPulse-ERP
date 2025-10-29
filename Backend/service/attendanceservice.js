let rec=require("../models/attendance");

exports.addattendance=async(req,res)=>
{
       let id=req.body.id;
       let date=req.body.date;
       let status=req.body.status;
console.log("req body--",req.body);

        let data=await rec.findOne({id,date})
      if(data)
      {
        return res.status(404).json({success:false,msg:"this already exist"});
      }
      else{
      let record=new rec({id:id,date:date,status:status});
      await record.save();
      return res.status(201).json({success:true,msg:"attendance got marked"});
      }
}

exports.viewattendance = async (req, res) => {
  let attendancelist = await rec.find();
  console.log(attendancelist);
  if (attendancelist.length === 0) {
    return res.status(404).json({ success: false, msg: "No staff found" });
  }

  return res.status(200).json({
    success: true,
    msg: "All staff details fetched successfully",
    attendance: attendancelist,
  });
};

exports.attendancecheck=async(req,res)=>
  {
    console.log(req.body);
    const records = req.body.records;


  try {
    const results = [];

    for (let record of records) {
      const existing = await rec.findOne({
        date: record.date,id:record.id
      });

      if (!existing) {
        const attendanceRecord = new rec({
          id: record.id,
          status: record.status,
        date: record.date,
          });

       await attendanceRecord.save();
      }
    }
    return res.status(200).json({
      message: "Attendance records saved successfully",
      data: results,
    });

  } catch (error) {
    console.error("Error saving attendance:", error);
    return res.status(500).json({ message: "Error saving attendance records", error });
  }
  }