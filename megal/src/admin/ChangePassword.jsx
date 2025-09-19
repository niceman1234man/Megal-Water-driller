import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const navigate = useNavigate();

  // ✅ Password validation (8+ chars, uppercase, lowercase, number, special char)
  const validatePassword = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const handleChangePassword = async () => {
    if (!form.oldPassword || !form.newPassword) {
      toast.error("Both old and new passwords are required.");
      return;
    }

    if (!validatePassword(form.newPassword)) {
      toast.error(
        "New password must be at least 8 characters, with uppercase, lowercase, number, and special char."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/api/auth/change-password",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Password updated successfully!");
      setForm({ oldPassword: "", newPassword: "" });

      // ✅ Redirect user back to login
      navigate("/admin/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred while changing password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Change Password
        </h2>

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
        <p className="text-xs text-gray-500 mb-4">
          Must be 8+ chars, include uppercase, lowercase, number, and special character.
        </p>

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
