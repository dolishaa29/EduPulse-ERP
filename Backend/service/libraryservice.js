
let rec = require("../models/Book");
let act = require("../models/activity");

exports.addbook = async (req, res) => {
  let bookId = req.body.bookId;
  let bookName = req.body.bookName;
  let author = req.body.author;
  let quantity = req.body.quantity;
  let description = req.body.description;
  let category = req.body.category;
  let image =  req.file.filename; 
  let book = new rec({
    bookId: bookId,
    bookName: bookName,
    description:description,
    author: author,
    quantity: quantity,
    category: category,
    image: image,  
    status: 'Available'  
  });

  try {
    await book.save();
    return res
      .status(201)
      .json({ success: true, msg: "Book added successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, msg: "Error while adding the book" });
  }
};




exports.viewbook=async(req,res)=>
{
  let librarylist = await rec.find();
  console.log(librarylist);

  if (librarylist.length === 0) {
    return res.status(404).json({ success: false, msg: 'No books found' });
  }

  return res.status(200).json({
    success: true,
    msg: 'All book details fetched successfully',
    book: librarylist,
  });
}

exports.deletebook=async(req,res)=>
{       console.log(req.params.id);
         let id=req.params.id;
        await rec.deleteOne({_id:id});
        return res.status(200).json({success:true,msg:"delete successfully!!"});
}




exports.issuebook=async(req,res)=>
{
  console.log("hello")
  try{
    const bookId=req.body.bookId;
    console.log(bookId);
    let student=req.staff;
    console.log(student);
    const book=await rec.findById(bookId);
    if(!book)
    {
      return res.status(404).json({success:false,msg:"Book not found"});
    }
    if(book.quantity<1) return res.status(400).json({success:false,msg:"Book not available"});

    book.quantity-=1;
    if(book.quantity===0) book.status='Not Available';
    await book.save();

    const activity=new act({
      bookId:bookId
,
studentId:student.id, studentName:student.name,action:'issued',date:new Date()
    });
    await activity.save();
    return res.status(200).json({success:true,msg:"Book issued successfully"});
  }catch(err)
  {
    console.error(err);
    return res.status(500).json({success:false,msg:"Error while issuing book"});
  }
}



exports.returnbook = async (req, res) => {
  try {
    const bookId = req.params.id;
    let student = req.student; 
    const book = await rec.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, msg: "Book not found" });
    }

    book.quantity += 1;
    if (book.quantity > 0) book.status = 'Available';
    await book.save();

    const activity = new act({
      bookId: bookId,
      studentId: student.id,
      studentName: student.name,
      action: 'returned',
      date: new Date(),
    });
    await activity.save();

    return res.status(200).json({ success: true, msg: "Book returned successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Error while returning book: " + err.message });
  }
};

exports.issued = async (bookId, studentId) => {
  try {
    const lastIssue = await rec2.findOne({ bookId, studentId, action: 'issued' }).sort({ date: -1 });

    if (!lastIssue) {
      throw new Error("No record of issuing found");
    }

    return lastIssue;
  } catch (err) {
    throw new Error("Error fetching last issued book: " + err.message);
  }
};
