import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function View() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Image */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Employee"
                className="rounded-full border-4 border-gray-300 shadow-md w-48 h-48 object-cover"
              />
            </div>
            {/* Employee Info */}
            <div>
              <div className="flex flex-col space-y-4">
                {/* Name */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">Name:</p>
                  <p className="text-lg font-medium text-gray-600">
                    {employee.userId.name}
                  </p>
                </div>
                {/* Employee ID */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Employee ID:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {employee.employeeId}
                  </p>
                </div>
                {/* DOB */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Date of Birth:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {new Date(employee.dob).toLocaleDateString()}
                  </p>
                </div>
                {/* Gender */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">Gender:</p>
                  <p className="text-lg font-medium text-gray-600">
                    {employee.gender}
                  </p>
                </div>
                {/* Department */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Department:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {employee.department.dep_name}
                  </p>
                </div>
                {/* Marital Status */}
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-700">
                    Marital Status:
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    {employee.maritalStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
}
export default View;
