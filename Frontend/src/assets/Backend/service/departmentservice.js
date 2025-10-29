let rec=require("../models/department");

exports.adddepartment=async(req,res)=>
{
    console.log('hello');
    
    let departId=req.body.departId;
    let departName=req.body.departName;
    let departDescription=req.body.departDescription;

    let data=await rec.find();
    if(data.length==0)
    {
        const id=1;
        let record=new rec({departId:departId,departName:departName,departDescription:departDescription,id:id});
        await record.save();
        return res.status(200).json({success:true,msg:'Department got registered'});
    }
    else{
        const id=data.length+1;
        let record=new rec({departId:departId,departName:departName,departDescription:departDescription,id:id});
        await record.save();
        return res.status(201).json({success:true,msg:'department got registered'});
    }


}

exports.viewdepartment = async (req, res) => {
    let departmentlist = await rec.find();  
    console.log(departmentlist);

    if (departmentlist.length === 0) {
        return res.status(404).json({ success: false, msg: 'No departments found' });
    }

    return res.status(200).json({success: true,msg: 'All department details fetched successfully',
          dept: departmentlist.map(department => ({
            _id:department._id,
            departId: department.departId,
            departName: department.departName,
            departDescription: department.departDescription,  
 
        }))
    });
};


exports.deletedepartment=async(req,res)=>
{
    let id=req.params.id;
    await rec.deleteOne({_id:id});
    return res.status(200).json({success:true,msg:"delete successfully!!"});
    

}

exports.updatedepartment = async (req, res) => {
  console.log('hiiii');

  let id = req.params.id; 
  let updatedData = req.body; 
  let record = await rec.findByIdAndUpdate({_id:id}, updatedData, { new: true });

  if (!record) {
    return res.status(404).json({ success: false, msg: "Department not found" });
  }

  console.log(record);

  return res.status(200).json({ success: true, msg: "Department updated successfully", department: record });
};


exports.Dviewbyid=async(req,res)=>
{
  console.log("hi");
  try {
    const departId = req.params.id;
    let department = await rec.findById(departId);
    if (!department) {
      return res.status(404).json({ success: false, msg: "Department not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Department details fetched successfully",
      department: department,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
}