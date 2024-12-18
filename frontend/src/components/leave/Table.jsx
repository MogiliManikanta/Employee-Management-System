import axios from "axios";
import { useEffect, useState } from "react";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

function Table() {
  const [leaves, setLeaves] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  async function fetchLeaves() {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data); // Debug API response
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            (new Date(leave.endDate).getTime() -
              new Date(leave.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />, // Ensure this component works
        }));
        setLeaves(data);
        setFilteredData(data);
      } else {
        console.error("API response error:", response.data.error);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        !error.response.data.success
      ) {
        alert(error.response.data.error);
      } else {
        console.error("Error fetching leaves:", error);
      }
    }
  }

  useEffect(() => {
    fetchLeaves();
  }, []);

  function filterByInput(e) {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(data);
  }

  function filterByButton(status) {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredData(data);
  }

  return (
    <>
      {filteredData ? (
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Page Header */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-extrabold text-gray-800">
              Manage Leaves
            </h3>
            <p className="text-gray-500 text-sm">
              Easily manage leave requests and statuses
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-md shadow-md">
            {/* Search Input */}
            <input
              type="text"
              onChange={filterByInput}
              placeholder="Search by Emp Id"
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />

            {/* Filter Buttons */}
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              className="react-data-table"
              customStyles={{
                header: {
                  style: {
                    backgroundColor: "rgb(243 244 246)", // Tailwind gray-100
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "rgb(31 41 55)", // Tailwind gray-800
                  },
                },
                rows: {
                  style: {
                    fontSize: "14px",
                    color: "rgb(55 65 81)", // Tailwind gray-700
                    "&:hover": {
                      backgroundColor: "rgb(229 231 235)", // Tailwind gray-200
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-700 text-lg">Loading...</p>
        </div>
      )}
    </>
  );
}

export default Table;
