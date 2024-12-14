import AdminSidebar from "../components/dashboard/AdminSidebar";
import AdminSummary from "../components/dashboard/AdminSummary";
import Navbar from "../components/dashboard/Navbar";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading ....</div>;
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <div>
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        {/* <AdminSummary />*/}
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
