import axios from "axios";
import React, { useContext, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const { user } = useAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("server Error");
      }
    }
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-700 to-gray-100 px-4">
      <h2 className="font-pacifico text-4xl text-white mb-8">
        Employee Management System
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-teal-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
