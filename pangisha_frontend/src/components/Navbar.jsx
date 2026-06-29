import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Heart,
  House,
  LayoutDashboard,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import Swal from "sweetalert2";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Logout",
    });

    if (result.isConfirmed) {
      logout();

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    }
  };

  const navLink = (path) =>
    location.pathname === path
      ? "text-yellow-300 font-semibold"
      : "hover:text-gray-200";

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link
          to={isAuthenticated ? "/home" : "/login"}
          className="text-2xl font-bold"
        >
          🏠 Pangisha
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {isAuthenticated && (
            <>
              <Link className={navLink("/home")} to="/home">
                Home
              </Link>

              <Link
                className={navLink("/properties")}
                to="/properties"
              >
                Properties
              </Link>

              <Link
                className={navLink("/favorites")}
                to="/favorites"
              >
                Favorites
              </Link>

              {user?.role === "landlord" && (
                <>
                  <Link
                    className={navLink("/dashboard")}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>

                  <Link
                    className={navLink("/add-property")}
                    to="/add-property"
                  >
                    Add Property
                  </Link>
                </>
              )}

              {/* Profile */}
              <div className="relative">

                <button
                  onClick={() =>
                    setDropdownOpen(!dropdownOpen)
                  }
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>

                  <ChevronDown size={18} />
                </button>

                {dropdownOpen && (

                  <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl text-gray-700 overflow-hidden">

                    <div className="p-4 border-b">

                      <p className="font-bold">
                        {user?.username}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user?.email}
                      </p>

                    </div>

                    <Link
                      to="/home"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <House size={18} />
                      Home
                    </Link>

                    <Link
                      to="/favorites"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <Heart size={18} />
                      Favorites
                    </Link>

                    {user?.role === "landlord" && (
                      <>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>

                        <Link
                          to="/add-property"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                        >
                          <PlusCircle size={18} />
                          Add Property
                        </Link>
                      </>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-600"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>

                )}

              </div>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-blue-800 p-4 space-y-3">

          {isAuthenticated ? (
            <>
              <Link className="block" to="/home">
                Home
              </Link>

              <Link className="block" to="/properties">
                Properties
              </Link>

              <Link className="block" to="/favorites">
                Favorites
              </Link>

              {user?.role === "landlord" && (
                <>
                  <Link
                    className="block"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>

                  <Link
                    className="block"
                    to="/add-property"
                  >
                    Add Property
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 w-full py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="block" to="/login">
                Login
              </Link>

              <Link className="block" to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}