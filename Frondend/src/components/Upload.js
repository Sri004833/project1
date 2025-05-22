
import React, { useState } from "react";

const Upload = ({ setData, setFilteredData }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setData(result.data || []);
    setFilteredData(result.data || []);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Upload Excel File</h2>
      <input type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
        Upload
      </button>
    </div>
  );
};

export default Upload;
