import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true, // Enable sorting
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

async function handleDelete(id, onDepartmentDelete) {
  const confirm = window.confirm("Do you want to delete?");
  if (confirm) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        onDepartmentDelete(); // Call the function to remove from the list
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
}

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(Id, onDepartmentDelete)}
      >
        Delete
      </button>
    </div>
  );
};
