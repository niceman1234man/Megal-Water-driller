import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/login", form); 
      localStorage.setItem("token", res.data.token);
      setError("");
      toast.success("Login successful!");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Megal Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="admin email"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="admin password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
           <div className="mt-8 text-center">
          <Link to="/admin/forgot-password" className="text-sm text-blue-500 hover:underline">
            Foregot Password
          </Link>
        </div>
        <p className="mt-4 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Megal Water Well Drilling PLC
        </p>
      </div>
    </div>
  );
}

export default Login;
