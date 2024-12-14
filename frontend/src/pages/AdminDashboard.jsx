import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
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
    <>
      <h1>Admin Dashboard {user && user.name}</h1>
    </>
  );
}

export default AdminDashboard;
