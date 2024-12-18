import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function viewSalary() {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        console.log(response);
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries == null ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg font-semibold text-gray-700">Loading...</div>
        </div>
      ) : (
        <div className="overflow-x-auto p-5 bg-gray-100 min-h-screen">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Salary History</h2>
            <p className="text-gray-600 mt-2">View and manage salary details</p>
          </div>

          <div className="flex justify-end my-4">
            <input
              type="text"
              placeholder="Search By Employee ID"
              className="border px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:outline-none border-gray-300 w-64"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-medium">
                  <tr>
                    <th className="px-6 py-3">S.NO</th>
                    <th className="px-6 py-3">Emp ID</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3">Allowance</th>
                    <th className="px-6 py-3">Deduction</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary, index) => (
                    <tr
                      key={salary.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-3 font-medium">{index + 1}</td>
                      <td className="px-6 py-3">
                        {salary.employeeId.employeeId || salary.employeeId._id}
                      </td>
                      <td className="px-6 py-3">{salary.basicSalary}</td>
                      <td className="px-6 py-3">{salary.allowances}</td>
                      <td className="px-6 py-3">{salary.deductions}</td>
                      <td className="px-6 py-3">
                        {salary.basicSalary +
                          salary.allowances -
                          salary.deductions}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 font-medium mt-4">
              No Records Found
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default viewSalary;
