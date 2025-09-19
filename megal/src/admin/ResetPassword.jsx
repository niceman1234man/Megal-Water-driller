import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({ token: "", password: "" });

  useEffect(() => {
    if (tokenFromUrl) {
      setForm((prev) => ({ ...prev, token: tokenFromUrl }));
    }
  }, [tokenFromUrl]);

  // ✅ Strong password validation
  const validatePassword = (password) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
  };

  const handleReset = async () => {
    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    if (!validatePassword(form.password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special char."
      );
      return;
    }

    try {
      const res = await axiosInstance.post("/api/auth/reset-password", form);
      toast.success(res.data.message || "Password reset successful!");
      setForm({ token: "", password: "" });

      // ✅ Clear the token from the URL
      navigate("/reset-password", { replace: true });

      // ✅ Redirect to login after short delay
      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Reset Password
        </h2>

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="New password"
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-xs text-gray-500 mb-4">
          Must be 8+ chars, include uppercase, lowercase, number, and special
          character.
        </p>

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
