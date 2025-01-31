import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Upload from "../components/Upload";
import Manage from "../components/Manage";
import Download from "../components/Download";
import { SendCode } from "../components/SendCode";
import GetCode from "../components/GetCode";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/upload" element={<PrivateRoute element={<Upload />} />} />
      <Route path="/manage" element={<PrivateRoute element={<Manage />} />} />
      <Route path="/download" element={<PrivateRoute element={<Download />} />} />
      <Route path="/get-code" element={<PrivateRoute element={<GetCode />} />} />
      <Route path="/send-code" element={<PrivateRoute element={<SendCode />} />} />      
    </Routes>
  );
};

export default AppRouter;
