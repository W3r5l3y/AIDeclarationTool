const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");

const app = express();
app.use(cors());

// Use memory storage (no files saved on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to receive PDF, modify it, return it
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Load uploaded PDF from memory
    const pdfDoc = await PDFDocument.load(req.file.buffer);

    // Add a blank page at the end
    pdfDoc.addPage();

    // Save the modified PDF
    const pdfBytes = await pdfDoc.save();

    // Send file back to frontend
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=modified.pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing PDF" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
