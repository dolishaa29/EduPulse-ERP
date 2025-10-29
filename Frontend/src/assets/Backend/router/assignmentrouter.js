const express = require("express");
const router = express.Router();
const auth=require("../middleware/staff");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { create,view,submission, viewsubmission, assfeedback,viewassfeedback, findSubmissionById } = require("../controller/assignmentcontroller");


const uploadsDir = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); 
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); 
  } else {
    cb(new Error("Only PDF files are allowed!"), false); 
  }
};

const upload = multer({ storage, fileFilter }); 
router.post("/create", upload.single("Assignment"), create);
router.get("/view",view);
router.post("/submission",upload.single("submissionFile"),submission);
router.get("/viewsubmission",viewsubmission);
router.post("/assfeedback",assfeedback);
router.get("/viewassfeedback",auth,viewassfeedback);
router.get("/findSubmissionById/:id",findSubmissionById)
module.exports = router;
