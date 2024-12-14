import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa"; // Dropdown icon
import rupee from "../../assets/rupee.png";
import { UserContext } from "../../contextapi/UserContext";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, setUser } = useContext(UserContext); // Include `setUser` to update after logout
  const navigate = useNavigate();

  // Toggle Services Dropdown
  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  // Handle Logout Function
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8080/logout", {}, { withCredentials: true });
      alert("Logout successful");
      setUser(null); // Reset user state after logout
      navigate("/HomePage"); // Redirect to homepage
    } catch (err) {
      console.error("Error during logout:", err);
      alert("Failed to log out");
    }
  };

  return (
    <header className="bg-[#010059] py-4 px-6 flex justify-between items-center">
      {/* Logo Section */}
      <div className="text-white font-bold text-xl flex items-center space-x-3">
        <img src={rupee} alt="Rupee Icon" className="w-10 h-10" />
        <Link to="/HomePage">INCENTUM</Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8 text-lg">
        <Link to="/HomePage" className="text-white hover:text-[#F5C13D] transition">
          Home
        </Link>
        <a href="/about" className="text-white hover:text-[#F5C13D] transition">
          About
        </a>

        {/* Services Dropdown */}
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
              <a href="/home-loan" className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition">
                Home Loan
              </a>
              <a href="/vehicle-loan" className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition">
                Vehicle Loan
              </a>
              <a href="/personal-loan" className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition">
                Personal Loan
              </a>
              <a href="/business-loan" className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition">
                Business Loan
              </a>
            </div>
          )}
        </div>
        <a href="/contact" className="text-white hover:text-[#F5C13D] transition">
          Contact
        </a>

        {/* Profile and Logout */}
        {user ? (
          <div className="relative">
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
                  className=" flex w-full gap-2 items-center text-left px-3 py-2 text-gray-800 hover:bg-blue-800 hover:text-white rounded-lg transition-all duration-300"
                >
                  <IoArrowBackCircleSharp className="w-8 h-8" />
                  Logout
                  
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signup-page" // Redirects to the Register page
            className="bg-[#F5C13D] px-5 py-2 rounded-lg text-black font-semibold hover:bg-[#F5C13D] transition"
          >
            Get Started
          </Link>
        )}
      </nav>

      {/* Mobile Navigation */}
      {/* Logic remains the same for the mobile view */}
    </header>
  );
};

export default Header;
