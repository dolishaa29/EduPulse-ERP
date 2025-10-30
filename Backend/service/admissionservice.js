const bcrypt = require('bcryptjs');
const StudentAdmission = require('../models/admission'); // Assuming you have the schema in models/studentAdmission.js

exports.admission = async (req, res) => {
  try {
    // Extract data from the request body
    const { email, name, password, dob, contact, city, address, department, basefee, hostel, library, transport, totalfee } = req.body;

    // Check if student already exists
    const existingStudent = await StudentAdmission.findOne({ email: email });

    if (existingStudent) {
      return res.status(400).json({ success: false, msg: "Student already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the last student ID to determine the new student's ID
    const students = await StudentAdmission.find();
    const id = students.length === 0 ? 1 : students.length + 1;

    // Create a new student admission record
    const newStudent = new StudentAdmission({
      email,
      name,
      password: hashedPassword,
      dob,
      contact,
      city,
      address,
      department,
      basefee,
      hostel,
      library,
      transport,
      totalfee,
      id, // Optional file upload (image)
    });

    // Save the new student record
    await newStudent.save();

    // Respond with success
    return res.status(201).json({ success: true, msg: "Student registered successfully" });
  } catch (err) {
    console.error("Error during student registration:", err);
    return res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
