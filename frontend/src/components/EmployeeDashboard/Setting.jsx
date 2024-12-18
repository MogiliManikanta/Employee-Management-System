import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Setting() {
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        alert("Password changed successfully");
        setError("");
        navigate("/employee-dashboard/");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Enter your old password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Enter your new password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Confirm your new password"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-teal-700 transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default Setting;
