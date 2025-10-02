import React, { useState } from "react";
import FileUploader from "./pages/FileUploader"; // adjust the path if needed

function App() {
  const [message] = useState("");
  return (
    <div>
      <h1>React Frontend</h1>
      <p>{message}</p>

      <FileUploader />
    </div>
  );
}

export default App;
