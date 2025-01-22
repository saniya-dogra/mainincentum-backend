import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/logo.webp"; // Update the path if needed
import { UserContext } from "../../contextapi/UserContext";

const Header = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".user-profile-dropdown") === null) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!ready) return null;

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logout successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <header className="bg-primary py-2 px-6 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-white font-bold text-xl flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
        <Link to="/HomePage">
        <img src={logo} alt="Rupee Icon" className="w-[150px] h-[60px]" />
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="text-white text-2xl md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Navbar */}
      <nav
        className={`absolute top-0 left-0 w-full bg-primary flex flex-col items-start p-4 space-y-4 md:hidden transform transition-transform duration-500 z-50 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="self-end text-white text-2xl mb-4"
          onClick={toggleMobileMenu}
        >
          <FaTimes />
        </button>

        <Link
          to="/HomePage"
          className="text-white hover:text-auButtomColor transition"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className="text-white hover:text-auButtomColor transition"
          onClick={toggleMobileMenu}
        >
          About
        </Link>
        <div className="relative w-full">
          <button
            className="text-white flex items-center w-full justify-between hover:text-auButtomColor transition cursor-pointer"
            onClick={toggleServicesDropdown}
          >
            Services
            <FaChevronDown
              className={`ml-2 text-sm transition-transform duration-300 ${
                isServicesDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div
            className={`bg-gray-800 text-white mt-2 rounded-lg shadow-lg w-full z-50 overflow-hidden transition-all duration-500 ${
              isServicesDropdownOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <Link
              to="/home-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Home Loan
            </Link>
            <Link
              to="/vehicle-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Vehicle Loan
            </Link>
            <Link
              to="/personal-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Personal Loan
            </Link>
            <Link
              to="/business-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Business Loan
            </Link>
          </div>
        </div>
        <Link
          to="/contact-us"
          className="text-white hover:text-auButtomColor transition"
          onClick={toggleMobileMenu}
        >
          Contact
        </Link>

        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="text-white hover:text-auButtomColor transition"
            >
              Logout
            </button>
            <Link
              to="/user-profile"
              className="text-white hover:text-auButtomColor transition"
              onClick={toggleMobileMenu}
            >
              Profile
            </Link>
          </>
        ) : (
          <Link
            to="/signup-page"
            className="bg-yellow-300 px-5 py-2 rounded-lg text-black font-semibold hover:bg-yellow-200 transition"
            onClick={toggleMobileMenu}
          >
            Get Started
          </Link>
        )}
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center space-x-8 text-lg">
        <Link
          to="/HomePage"
          className="text-white hover:text-auButtomColor transition hover:scale-110 duration-300"
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className="text-white hover:text-auButtomColor transition hover:scale-110 duration-300"
        >
          About
        </Link>
        <div className="relative">
          <button
            className="text-white flex items-center hover:text-auButtomColor transition cursor-pointer"
            onClick={toggleServicesDropdown}
          >
            Services
            <FaChevronDown
              className={`ml-2 text-sm transition-transform duration-300 ${
                isServicesDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div
            className={`absolute bg-gray-800 text-white mt-2 rounded-lg shadow-lg w-48 z-50 transition-all duration-500 overflow-hidden ${
              isServicesDropdownOpen ? "max-h-screen" : "max-h-0"
            }`}
          >
            <Link
              to="/home-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Home Loan
            </Link>
            <Link
              to="/vehicle-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Vehicle Loan
            </Link>
            <Link
              to="/personal-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Personal Loan
            </Link>
            <Link
              to="/business-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Business Loan
            </Link>
          </div>
        </div>

        <Link
          to="/contact-us"
          className="text-white hover:text-auButtomColor transition hover:scale-110 duration-300"
        >
          Contact
        </Link>
        {user ? (
          <div className="relative user-profile-dropdown">
            <div
              onClick={() => setShowLogout(!showLogout)}
              className="flex gap-2 border bg-yellow-300 border-gray-300 rounded-full py-1 px-3 shadow-md shadow-gray-400 items-center cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="text-blue-900 rounded-full border overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              {user.name && <div>{user.name}</div>}
            </div>
            {showLogout && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg z-50 w-35 transition-opacity duration-300">
                <button
                  onClick={handleLogout}
                  className="flex w-full gap-2 items-center text-left px-3 py-2 text-gray-800 hover:bg-auColor hover:text-white rounded-lg transition-all duration-300"
                >
                  <IoArrowBackCircleSharp className="w-8 h-8" />
                  Logout
                </button>
                <Link to={"/user-profile"}>
                  <button className="flex w-full gap-2 items-center text-left px-3 py-2 text-gray-800 hover:bg-auColor hover:text-white rounded-lg transition-all duration-300">
                    Profile
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signup-page"
            className="bg-yellow-300 px-5 py-2 rounded-lg text-black font-semibold hover:bg-yellow-200 transition hover:scale-105 duration-300"
          >
            Get Started
          </Link>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
      </nav>
    </header>
  );
};

export default Header;