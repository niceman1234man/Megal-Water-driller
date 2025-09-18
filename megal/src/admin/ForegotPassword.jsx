import React, { useState } from "react";
import axiosInstance from "../axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/forgot-password", { email });
      setMessage(`Reset token: ${res.data.resetToken}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Forgot Password</h2>

        {message && <p className="text-center text-sm mb-4 text-green-600">{message}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleForgot}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Reset Token
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
