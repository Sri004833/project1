
const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Upload and parse Excel
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  const filePath = path.join(__dirname, "..", "..", req.file.path);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  fs.unlinkSync(filePath); // clean up uploaded file

  res.json({ data });
});

module.exports = router;
