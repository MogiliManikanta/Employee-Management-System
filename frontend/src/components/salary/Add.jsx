import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  const navigate = useNavigate();
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments();
        setDepartments(departments);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setDepartments([]);
      }
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    try {
      const emp = await getEmployees(e.target.value);
      console.log(emp);
      setEmployees(emp);
      console.log(employees);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setEmployees([]);
    }
  };

  return (
    <>
      {departments.length > 0 ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep, index) => (
                    <option value={dep._id} key={index}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp, index) => (
                    <option value={emp._id} key={index}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>
              {/* Basic Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="basicSalary"
                  placeholder="Basic Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="allowances"
                  placeholder="Allowances"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  name="deductions"
                  placeholder="Deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="payDate"
                  placeholder="Pay Date"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md block"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center text-red-500">
          Failed to load departments. Please try again later.
        </div>
      )}
    </>
  );
}

export default Add;
