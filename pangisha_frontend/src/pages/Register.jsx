import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Username, email and password are required.",
      });
      return false;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters.",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords do not match",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        role: formData.role,
      };

      const response = await registerUser(payload);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: response.message,
      });

      navigate("/login");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.error ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Join Pangisha Smart House
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-8"
        >

          <div>
            <label className="font-medium">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="JohnDoe"
            />
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="john@gmail.com"
            />
          </div>

          <div>
            <label className="font-medium">
              Phone Number
            </label>

            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
              placeholder="07XXXXXXXX"
            />
          </div>

          <div>
            <label className="font-medium">
              Account Type
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <div>
            <label className="font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}