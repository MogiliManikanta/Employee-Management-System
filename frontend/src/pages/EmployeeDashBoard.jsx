import { useAuth } from "../context/authContext";

function EmployeeDashBoard() {
  const { user } = useAuth();
  return (
    <div>
      <h1>EmployeeDashBoard : {user.name}</h1>
    </div>
  );
}

export default EmployeeDashBoard;
