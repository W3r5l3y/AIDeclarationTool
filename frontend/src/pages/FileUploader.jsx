import React, { useState } from "react";

function FileUploader() {
    // State to hold the selected file
    const [file, setFile] = useState(null);

    // Function to handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Please select a PDF file");
        }
    };

    // Function to handle file upload
    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errMsg = await response.text(); // Backend error message
        throw new Error(errMsg);
      }

      // Convert response to a blob
      const blob = await response.blob();

      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      window.open(url, '_blank');
      //a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    };

    return (
        <div>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
            <button onClick={handleUpload} disabled={!file}>
                Upload PDF
            </button>
            {file && <p>Selected file: {file.name}</p>}
        </div>
    );
}

export default FileUploader;
