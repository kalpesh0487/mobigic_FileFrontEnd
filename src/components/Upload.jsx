import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Moved the navigate hook to the top level

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload!");
      return;
    }
    setFile(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_FILE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      toast.success("File uploaded successfully!");
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      toast.error("File upload failed. Please try again.");
      console.error("Error uploading file", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <button
        onClick={() => navigate("/home")} // Corrected the onClick function to use navigate
        className="flex absolute cursor-pointer top-4 left-4 px-4 py-2 bg-black text-white rounded-md  items-center"
      >
        <IoIosArrowBack size={20} />
        <span>Home</span>
      </button>
      <div className="w-96 p-6 border border-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Upload File</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border border-black mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-black text-white p-2 rounded hover:scale-105 transition-all cursor-pointer"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
