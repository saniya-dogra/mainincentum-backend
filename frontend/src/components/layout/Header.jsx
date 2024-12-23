import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import rupee from "../../assets/rupee.png"; // Update the path if needed
import { UserContext } from "../../contextapi/UserContext";

const Header = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Close the logout dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (event.target.closest(".user-profile-dropdown") === null) {
        setShowLogout(false);
      }
    };

    // Attach the event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
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
      // Step 1: Send the logout request to the backend
      await axios.post(
        "http://localhost:8080/api/v1/users/logout",
        {},
        { withCredentials: true }  // Make sure withCredentials is true
      );
  
      // Step 2: Remove the token from localStorage
      localStorage.removeItem("token");
  
      // Step 3: Set the user state to null (this will also update the UI)
      setUser(null);
  
      // Step 4: Show a success toast
      toast.success("Logout successful!", {
        position: "top-center",
        autoClose: 2000,
      });
  
      // Step 5: Navigate to home after the toast disappears
      await new Promise((resolve) => setTimeout(resolve, 2000));  // Wait for 2 seconds
      navigate("/");
  
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  
  
  return (
    <header className="bg-[#010059] py-4 px-6 flex justify-between items-center">
      {/* Logo Section */}
      <div className="text-white font-bold text-xl flex items-center space-x-3">
        <img src={rupee} alt="Rupee Icon" className="w-10 h-10" />
        <Link to="/HomePage">INCENTUM</Link>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <button
        className="text-white text-2xl md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#010059] flex flex-col items-start p-4 space-y-4 md:hidden">
          <Link
            to="/HomePage"
            className="text-white hover:text-[#F5C13D] transition"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <a
            href="/about"
            className="text-white hover:text-[#F5C13D] transition"
            onClick={toggleMobileMenu}
          >
            About
          </a>
          <div className="relative w-full">
            <button
              className="text-white flex items-center w-full justify-between hover:text-[#F5C13D] transition cursor-pointer"
              onClick={toggleServicesDropdown}
            >
              Services
              <FaChevronDown className="ml-2 text-sm" />
            </button>
            {isServicesDropdownOpen && (
              <div className="bg-gray-800 text-white mt-2 rounded-lg shadow-lg w-full z-50">
                <a
                  href="/home-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={toggleMobileMenu}
                >
                  Home Loan
                </a>
                <a
                  href="/vehicle-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={toggleMobileMenu}
                >
                  Vehicle Loan
                </a>
                <a
                  href="/personal-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={toggleMobileMenu}
                >
                  Personal Loan
                </a>
                <a
                  href="/business-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={toggleMobileMenu}
                >
                  Business Loan
                </a>
              </div>
            )}
          </div>
          <a
            href="/contact"
            className="text-white hover:text-[#F5C13D] transition"
            onClick={toggleMobileMenu}
          >
            Contact
          </a>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="text-white hover:text-[#F5C13D] transition"
              >
                Logout
              </button>
              <Link
                to="/user-profile"
                className="text-white hover:text-[#F5C13D] transition"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
            </>
          ) : (
            <Link
              to="/signup-page"
              className="bg-[#F5C13D] px-5 py-2 rounded-lg text-black font-semibold hover:bg-[#F5C13D] transition"
              onClick={toggleMobileMenu}
            >
              Get Started
            </Link>
          )}
        </nav>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8 text-lg">
        <Link
          to="/HomePage"
          className="text-white hover:text-[#F5C13D] transition"
        >
          Home
        </Link>
        <a href="/about" className="text-white hover:text-[#F5C13D] transition">
          About
        </a>
        <div className="relative">
          <button
            className="text-white flex items-center hover:text-[#F5C13D] transition cursor-pointer"
            onClick={toggleServicesDropdown}
          >
            Services
            <FaChevronDown className="ml-2 text-sm" />
          </button>
          {isServicesDropdownOpen && (
            <div className="absolute bg-gray-800 text-white mt-2 rounded-lg shadow-lg w-48 z-50">
              <a
                href="/home-loan"
                className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
              >
                Home Loan
              </a>
              <a
                href="/vehicle-loan"
                className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
              >
                Vehicle Loan
              </a>
              <a
                href="/personal-loan"
                className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
              >
                Personal Loan
              </a>
              <a
                href="/business-loan"
                className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
              >
                Business Loan
              </a>
            </div>
          )}
        </div>
        <a href="/contact" className="text-white hover:text-[#F5C13D] transition">
          Contact
        </a>
        {user ? (
          <div className="relative user-profile-dropdown">
            <div
              onClick={() => setShowLogout(!showLogout)}
              className="flex gap-2 border bg-yellow-300 border-gray-300 rounded-full py-1 px-3 shadow-md shadow-gray-400 items-center cursor-pointer"
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
              <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg z-50 w-35">
                <button
                  onClick={handleLogout}
                  className="flex w-full gap-2 items-center text-left px-3 py-2 text-gray-800 hover:bg-blue-800 hover:text-white rounded-lg transition-all duration-300"
                >
                  <IoArrowBackCircleSharp className="w-8 h-8" />
                  Logout
                </button>
                <Link to={"/user-profile"}>
                  <button className="flex w-full gap-2 items-center text-left px-3 py-2 text-gray-800 hover:bg-blue-800 hover:text-white rounded-lg transition-all duration-300">
                    Profile
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signup-page"
            className="bg-[#F5C13D] px-5 py-2 rounded-lg text-black font-semibold hover:bg-[#F5C13D] transition"
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
