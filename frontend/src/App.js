import React, { useEffect, useState } from "react";
import FileUploader from "./pages/FileUploader"; // adjust the path if needed

function App() {
  const [message, setMessage] = useState("");
 
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>{message}</p>

      <FileUploader />
    </div>
  );
}

export default App;
