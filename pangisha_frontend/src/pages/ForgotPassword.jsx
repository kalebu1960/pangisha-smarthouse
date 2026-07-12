import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import loginBackground from "../assets/Image.jpg";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email.",
      });
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email }
      );

      Swal.fire({
        icon: "success",
        title: "Email Sent",
        text: "If the email exists, a password reset link has been sent.",
      });

      setEmail("");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">

        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-blue-700">
            Forgot Password
          </h2>

          <p className="text-center text-gray-600 mt-2">
            Enter your email to receive a reset link.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

          </form>

          <div className="text-center mt-5">
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}