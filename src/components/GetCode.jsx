import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaCopy } from 'react-icons/fa'; // Importing the copy icon from react-icons
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importing toast from react-toastify
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';

const GetCode = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Use-effected")
    // Fetching files from the backend API
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log(`${import.meta.env.VITE_API_FILE_URL}/get`);
        const response = await axios.get(`${import.meta.env.VITE_API_FILE_URL}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setFiles(response.data);
      } catch (error) {
        toast.error("Failed to fetch files");
      }
    };
    
    fetchFiles();
  }, []);

  // Function to copy the file code to clipboard
  const handleCopy = (fileCode) => {
    navigator.clipboard.writeText(fileCode)
      .then(() => {
        toast.success('File code copied');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <button
          onClick={() => navigate("/home")} // Corrected the onClick function to use navigate
          className="flex gap-2 cursor-pointer absolute top-4 left-4 px-4 py-2 bg-black text-white rounded-md  items-center"
        >
        <IoIosArrowBack size={17} />
        <span>Home</span>
      </button>
      <button
          onClick={() => navigate("/send-code")} // Corrected the onClick function to use navigate
          className="flex gap-2 cursor-pointer absolute top-4 right-10 px-4 py-2 bg-black text-white rounded-md  items-center"
        >
        <span>Download File</span>
        <FaArrowRight size={17} />
        
      </button>
      <h2 className="text-2xl font-semibold text-center mb-4">All Files</h2>
      <table className="table-auto w-full border-collapse border border-gray-200 ">
        <thead>
          <tr className="bg-gray-100">
            
            <th className="p-2 border border-gray-300">Original Name</th>
            <th className="p-2 border border-gray-300">File Code</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id} className=''>
              
              <td className="p-2 border border-gray-300">{file.originalName}</td>
              <td className="p-2 border border-gray-300">{file.fileCode}</td>
              <td className="p-2 border border-gray-300">
                <button
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => handleCopy(file.fileCode)}
                >
                  <FaCopy size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetCode;
