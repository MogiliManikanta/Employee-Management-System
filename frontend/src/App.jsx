import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashBoard from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import Department from "./components/departments/Department";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />{" "}
          {/* Default page for /admin-dashboard */}
          <Route
            path="/admin-dashboard/departments"
            element={<Department />}
          />{" "}
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          />{" "}
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          />
          <Route path="/admin-dashboard/employees/" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />{" "}
          <Route path="/admin-dashboard/employees/:id" element={<View />} />{" "}
          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<Edit />}
          />{" "}
          {/* Relative path */}
        </Route>

        {/* Employee Dashboard route */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashBoard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
