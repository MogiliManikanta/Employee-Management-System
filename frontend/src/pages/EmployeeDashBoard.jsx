import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import { useAuth } from "../context/authContext";

function EmployeeDashBoard() {
  const { user } = useAuth();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        {/* <AdminSummary />*/}
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashBoard;
