import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt, FaCloudUploadAlt, FaDownload } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // If no token, redirect to login
      navigate("/login");
    } else {
      setUser("User");  // Placeholder for actual user data
    }
  }, [navigate]);

  return (
    <div className=" h-screen relative">
      {/* Logout Button - Top Right */}
      <button
        className="absolute top-4 right-4 bg-black text-white p-2 rounded  hover:scale-105"
        onClick={() => {
          localStorage.removeItem("authToken"); // Logout
          navigate("/login"); // Redirect to login
        }}
      >
        Logout
      </button>

      {/* Welcome Text */}
      <div className="flex justify-center items-center h-1/4">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome to Home Page</h2>
      </div>

      {/* Grid with 3 Operations */}
      <div className="grid h-32 md:h-[60vh] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Upload File */}
        <div className="p-4 border hover:scale-105 transition-all cursor-pointer border-black rounded-lg shadow-md text-center flex flex-col justify-center items-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Upload File</h3>
          </div>
          <div className="mb-3">
          <FaCloudUploadAlt size={52}/>
          </div>
          <Link to="/upload" className="bg-black w-full text-white p-2 rounded hover:-80">
            Click Here
          </Link>
        </div>

        {/* Get & Delete Files */}
        <div className="p-4 border hover:scale-105 transition-all cursor-pointer border-black rounded-lg shadow-md text-center flex flex-col justify-center items-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Get & Delete Files</h3>
          </div>
          <div className="mb-3">
          <MdManageAccounts size={60}/>
          </div>
          <Link to="/manage" className="bg-black w-full text-white p-2 rounded ">
            Click Here
          </Link>
        </div>

        {/* Download Files */}
        <div className="p-4 border hover:scale-105 transition-all cursor-pointer border-black rounded-lg shadow-md text-center flex flex-col justify-center items-center">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Download Files</h3>
          </div>
          <div className="mb-3">
          <FaDownload size={40} />
          </div>
          <Link to="/download" className="bg-black w-full text-white p-2 rounded ">
            Click Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
