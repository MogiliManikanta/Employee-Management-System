import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function LeaveList() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const { id } = useParams();
  // const id = user.role === "admin" ? user._id : empId;
  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
        // setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          className="px-4 py-0.5 border"
          type="text"
          placeholder="Search By Dep Name"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <table className="min-w-full text-sm text-left text-gray-500 mt-6">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-medium">
          <tr>
            <th className="px-6 py-3">S.NO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            {/**<th className="px-6 py-3">Applied Date</th>*/}
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td className="px-6 py-3 font-medium">{index + 1}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              {/**  <td className="px-6 py-3">{leave.}</td>*/}
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {" "}
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default LeaveList;
