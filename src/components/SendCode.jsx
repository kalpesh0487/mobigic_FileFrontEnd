import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

export const SendCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!code) {
      setError('Please enter a file code');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_FILE_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.blob(); // Get the response as a Blob

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to download file');
        return;
      }

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(data); // Create a URL for the Blob
      link.download = 'FileMania'; // Set a default name for the downloaded file

      // Trigger the download
      link.click();

      setMessage('File will be download');
    } catch (err) {
      setError('An error occurred while downloading the file');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <button
            onClick={() => navigate("/home")} // Corrected the onClick function to use navigate
            className="flex gap-2 cursor-pointer absolute top-4 left-4 px-4 py-2 bg-black text-white rounded-md  items-center"
          >
        <IoIosArrowBack size={17} />
        <span>Home</span>
      </button>
      <button
          onClick={() => navigate("/get-code")} // Corrected the onClick function to use navigate
          className="flex gap-2 cursor-pointer absolute top-4 right-10 px-4 py-2 bg-black text-white rounded-md  items-center"
        >
        <span>Get Code</span>
        <FaArrowRight size={17} />
        
      </button>
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h3 className="text-2xl font-bold text-center mb-6">Enter code to download file</h3>

        <div className="mb-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter file code"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 text-center">
          <button
            onClick={handleDownload}
            className="w-full bg-black text-white p-3 rounded-4xl text-lg font-semibold hover:bg-gray-800 focus:outline-none"
          >
            Download
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
      </div>
    </div>
  );
};
