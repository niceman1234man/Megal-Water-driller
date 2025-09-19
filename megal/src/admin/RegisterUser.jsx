import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

function RegisterUser() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  // ✅ Email validation (basic RFC compliant)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // ✅ Strong password validation
  const validatePassword = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    if (!form.email || !form.password) {
      setMessage("Email and password are required.");
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      setMessage(
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const res = await axiosInstance.post("/api/auth/register", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Register New User
        </h2>

        {message && (
          <p
            className={`text-center text-sm mb-4 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="new user email"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="password"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be 8+ chars, with uppercase, lowercase, number, and special
            character.
          </p>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register User
        </button>
      </div>
    </div>
  );
}

export default RegisterUser;
