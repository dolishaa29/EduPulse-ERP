let rec = require("../models/Book");
let act = require("../models/activity");
let data = require("../models/da");

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
    let student=req.adm;
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
        const da=new data({
      bookId:bookId
,
studentId:student.id, studentName:student.name,action:'issued',date:new Date()
    });
    await da.save();
    await activity.save();
    return res.status(200).json({success:true,msg:"Book issued successfully"});
  }catch(err)
  {
    console.error(err);
    return res.status(500).json({success:false,msg:"Error while issuing book"});
  }
}





exports.issued = async (req, res) => {
  try {
    const student = req.adm; 

    console.log("Student ID:", student.id);

    const issuedBooks = await data.find({ studentId: student.id, action: 'issued' }).sort({ date: -1 });

    if (issuedBooks.length === 0) {
      return res.status(404).json({ success: false, msg: "No issued books found." });
    }
    return res.status(200).json({ success: true, books: issuedBooks });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Error fetching issued books: " + err.message });
  }
};


exports.returnbook = async (req, res) => {
  try {
    const bookId = req.body.bookId;
    console.log(bookId);

    let student = req.adm;  
    const book = await rec.findById(bookId);
    const da = await data.findById(bookId);
    console.log(da);
    if (!book) {
      return res.status(404).json({ success: false, msg: "Book not found" });
    }

    book.quantity += 1; 
    if (book.quantity > 0) {
      book.status = 'Available';  
    }
    await book.save();

da.action = 'returned';
await da.save();

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
    console.error('Error while returning the book:', err);
    return res.status(500).json({ success: false, msg: "Error while returning book: " + err.message });
  }
};
