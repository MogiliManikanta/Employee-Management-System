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
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/ViewSalary";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import EmployeeSummaryCard from "./components/EmployeeDashboard/EmployeeSummary";
import LeaveList from "./components/leave/LeaveList";
import LeaveAdd from "./components/leave/LeaveAdd";
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/leave/Table";
import LeaveDetail from "./components/leave/LeaveDetail";

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
          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<ViewSalary />}
          />{" "}
          <Route
            path="/admin-dashboard/employees/leaves/:id"
            element={<LeaveList />}
          />
          {/* Relative path */}
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />
          <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />} />
          <Route path="/admin-dashboard/settings" element={<Setting />} />
        </Route>

        {/* Employee Dashboard route */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashBoard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummaryCard />} />
          <Route path="/employee-dashboard/profile/:id" element={<View />} />
          <Route
            path="/employee-dashboard/leaves/:id"
            element={<LeaveList />}
          />
          <Route path="/employee-dashboard/add-leave" element={<LeaveAdd />} />
          <Route
            path="/employee-dashboard/salary/:id"
            element={<ViewSalary />}
          />
          <Route path="/employee-dashboard/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
