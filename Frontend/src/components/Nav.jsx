import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import home from "../assets/home.png";
import service from "../assets/service.png";
import { authDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function Nav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, serverUrl } = useContext(authDataContext);
  const { setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="StayFinder Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-[#f14242] hidden sm:inline">
            StayFinder
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-1 px-2 py-1 font-medium ${
                isActive
                  ? "text-[#f14242] border-b-2 border-[#f14242]"
                  : "text-gray-700 hover:text-[#f14242]"}`
            }
            end
          >
            <img src={home} alt="Home" className="h-6 w-6" />
            Homes
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `flex items-center gap-1 px-2 py-1 font-medium ${
                isActive
                  ? "text-[#f14242] border-b-2 border-[#f14242]"
                  : "text-gray-700 hover:text-[#f14242]"}`
            }
            end
          >
            <img src={service} alt="Services" className="h-6 w-6" />
            Services
          </NavLink>
          <button
            onClick={() =>
              isAuthenticated ? navigate("/listingpage1") : navigate("/login")
            }
            className="bg-[#f14242] text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
          >
            Become a Host
          </button>

          {/* Profile Button - Desktop Only */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center border border-gray-300 rounded-full p-2 hover:shadow-md transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setIsProfileOpen(false)}>
                      Profile
                    </Link>
                    <Link to="/my-bookings" className="block px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setIsProfileOpen(false)}>
                      My Bookings
                    </Link>
                    <div className="border-t my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setIsProfileOpen(false)}>
                    Login
                  </Link>
                )}
                <div className="border-t my-1" />
                <Link to="/help-center" className="block px-4 py-2 hover:bg-gray-100 text-left" onClick={() => setIsProfileOpen(false)}>
                  Help Center
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-[#f14242] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
            Homes
          </NavLink>
          <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
            Services
          </NavLink>
          <NavLink to="/listingpage1" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
            Become a Host
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
                Profile
              </NavLink>
              <NavLink to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
                My Bookings
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-red-600 hover:text-red-800 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
              Login
            </NavLink>
          )}
          <NavLink to="/help-center" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-[#f14242]">
            Help Center
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Nav;
