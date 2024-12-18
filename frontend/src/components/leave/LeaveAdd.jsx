import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LeaveAdd() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    userId: user._id,
  });
  function handleChnage(e) {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Request for Leave
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChnage}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChnage}
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChnage}
                className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="reason"
              onChange={handleChnage}
              rows="4"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              placeholder="Provide a brief description for your leave"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md shadow-lg transition duration-300"
          >
            Add Leave
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeaveAdd;
