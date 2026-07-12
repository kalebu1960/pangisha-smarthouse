import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginBackground from "../assets/Image.jpg";


import { forgotPassword, loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

      if (data.user.role === "landlord") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.error || "Invalid email or password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      Swal.fire({
        icon: "warning",
        title: "Email required",
        text: "Please enter your email address first.",
      });
      return;
    }

    try {
      const response = await forgotPassword(formData.email);
      Swal.fire({
        icon: "success",
        title: "Request received",
        text: response.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: error.response?.data?.error || "Unable to process your request right now.",
      });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 items-center gap-16 px-8 lg:px-20">

        <div className="hidden lg:block max-w-xl text-white">

          <h1 className="text-6xl font-bold leading-tight">
            Find Your
            <br />
            Perfect Home
          </h1>

          <p className="mt-6 text-xl leading-8 text-gray-200">
            Discover houses, apartments, and rental properties across
            Kenya.
            <br />
            Rent, buy or list your property with confidence using
            Pangisha Smart House.
          </p>

          <div className="mt-10 flex gap-4">

            <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4">
              <h3 className="text-3xl font-bold">500+</h3>
              <p>Properties</p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4">
              <h3 className="text-3xl font-bold">100+</h3>
              <p>Landlords</p>
            </div>

          </div>

        </div>

        <div className="w-full max-w-md">

          <div className="bg-white/85 backdrop-blur-lg shadow-2xl rounded-3xl p-8">

            <h2 className="text-4xl font-bold text-center text-blue-700">
              Welcome Back
            </h2>

            <p className="text-center text-gray-600 mt-2">
              Login to your account
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={handleSubmit}
            >

              <div>
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="w-full border rounded-xl p-3 pr-12 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <p className="text-center mt-6 text-gray-600">

              Don't have an account?

              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}