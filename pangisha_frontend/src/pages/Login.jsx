import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your email and password.",
      });
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.token, data.user);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Hello ${data.user.username}`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect based on role
      if (data.user.role === "landlord") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.error ||
          "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Pangisha Smart House
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={handleSubmit}
        >

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}