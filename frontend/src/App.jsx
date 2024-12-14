import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; // Ensure this is the correct path to your Login component
import AdminDashboard from "./pages/AdminDashboard"; // Ensure this is the correct path to your AdminDashboard component
import EmployeeDashBoard from "./pages/EmployeeDashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
