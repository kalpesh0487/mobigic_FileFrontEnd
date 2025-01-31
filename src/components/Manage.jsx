import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';

const Manage = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  // Fetch files on component mount
  useEffect(() => {
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
    console.log(files)
    fetchFiles();
  }, []);

  // Delete file
  const deleteFile = async (fileId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${import.meta.env.VITE_API_FILE_URL}/delete/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(files.filter(file => file._id !== fileId)); // Remove file from state
      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="container mx-auto p-6">
    <button
        onClick={() => navigate("/home")} // Corrected the onClick function to use navigate
        className="flex cursor-pointer absolute top-4 left-4 px-4 py-2 bg-black text-white rounded-md  items-center"
      >
        <IoIosArrowBack size={20} />
        <span>Home</span>
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Files</h2>
      <table className="table-auto w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Original Name</th>
            <th className="border border-black p-2">File Code</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file) => (
              <tr key={file._id}>
                
                <td className="border border-black p-2">{file.originalName}</td>
                <td className="border border-black p-2">{file.fileCode}</td>
                <td className="border border-black p-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
                    onClick={() => deleteFile(file._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No files found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Manage;
