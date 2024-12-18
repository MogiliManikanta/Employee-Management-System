import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LeaveDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setLeave(response.data.leaves);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-10 rounded-lg shadow-xl">
          {/* Title */}
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Image */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                alt="Employee"
                className="rounded-full border-4 border-teal-500 shadow-lg w-48 h-48 object-cover"
              />
            </div>

            {/* Employee Information */}
            <div>
              <div className="flex flex-col space-y-6">
                {/* Name */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">Name:</p>
                  <p className="text-lg font-medium text-gray-600">
                    {leave.employeeId.userId.name}
                  </p>
                </div>
                {/* Employee ID */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Employee ID:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {leave.employeeId.employeeId}
                  </p>
                </div>
                {/* Leave Type */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Leave Type:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {leave.leaveType}
                  </p>
                </div>
                {/* Reason */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">Reason:</p>
                  <p className="text-lg font-medium text-gray-600">
                    {leave.reason}
                  </p>
                </div>
                {/* Department */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Department:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {leave.employeeId.department.dep_name}
                  </p>
                </div>
                {/* Start Date */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Start Date:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </p>
                </div>
                {/* End Date */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    End Date:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                </div>
                {/* Status/Action */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    {leave.status === "Pending" ? "Action:" : "Status:"}
                  </p>
                  {leave.status === "Pending" ? (
                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none shadow-lg"
                        onClick={() => changeStatus(leave._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none shadow-lg"
                        onClick={() => changeStatus(leave._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`px-4 py-1 rounded-lg font-medium text-white shadow-lg ${
                        leave.status === "Approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {leave.status}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12 text-lg">
          Loading...
        </div>
      )}
    </>
  );
}

export default LeaveDetail;
