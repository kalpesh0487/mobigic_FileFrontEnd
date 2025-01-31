import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If no token, redirect to login
    navigate("/login");
    return null;
  }

  return element;
};

export default PrivateRoute;
