import React from 'react'
import GetCode from './GetCode'
import { SendCode } from './SendCode'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';

const Download = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center mt-6 '>
    <button
        onClick={() => navigate("/home")} // Corrected the onClick function to use navigate
        className="flex absolute cursor-pointer top-4 left-4 px-4 py-2 bg-black text-white rounded-md  items-center"
      >
        <IoIosArrowBack size={20} />
        <span>Home</span>
      </button>
      <Link to="/get-code" className='w-86 hover:scale-102 transition-all flex justify-between p-5 cursor-pointer text-center items-center h-12 border-2 border-black bg-black text-white rounded-4xl m-2'>
        <div>Get Your Code</div>
        <FaArrowRight size={15} style={{color: 'white'}}/>
      </Link>
      <Link to="/send-code" className='w-86 hover:scale-102 transition-all p-5 justify-between cursor-pointer text-center flex items-center h-12 border-2 border-black bg-black text-white rounded-4xl m-2'>
        <div>Send your code to download file </div>
        <FaArrowRight size={15} style={{color: 'white'}}/>
      </Link>
    </div>
  )
}

export default Download