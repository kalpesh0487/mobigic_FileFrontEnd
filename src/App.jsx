import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouter from "./routes/routes";

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right"/>
      <AppRouter />
    </Router>
  );
}

export default App;