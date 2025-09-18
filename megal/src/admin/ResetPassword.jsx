import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");

  const [form, setForm] = useState({ token: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (tokenFromUrl) {
      setForm((prev) => ({ ...prev, token: tokenFromUrl }));
    }
  }, [tokenFromUrl]);

  const handleReset = async () => {
    try {
      const res = await axiosInstance.post("/api/auth/reset-password", form);
      setMessage(res.data.message);
      setForm({ token: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Reset Password</h2>

        {message && <p className="text-center text-sm mb-4 text-green-600">{message}</p>}

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="New password"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
