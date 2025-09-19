import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
const router = useNavigate();
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/api/auth/change-password",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
      router.push("/admin/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Change Password</h2>

        {message && <p className="text-center text-sm mb-4 text-green-600">{message}</p>}

        <input
          type="password"
          value={form.oldPassword}
          onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          placeholder="Old password"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          placeholder="New password"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
