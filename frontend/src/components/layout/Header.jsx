import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import axios from "axios";

import rupee from "../../assets/rupee.png"; // Update the path if needed
import { UserContext } from "../../contextapi/UserContext";

const Header = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();

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
        "http://localhost:8080/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      alert("Logout successful");
      setUser(null);
      navigate("/HomePage");
    } catch (err) {
      console.error("Error during logout:", err);
      alert("Failed to log out");
    }
  };

  return (
    <header className="bg-primary py-4 px-6 flex justify-between items-center transition-all duration-500">
      {/* Logo Section */}
      <div className="text-white font-bold text-xl flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
        <img src={rupee} alt="Rupee Icon" className="w-10 h-10 animate-bounce" />
        <Link to="/HomePage">INCENTUM</Link>
      </div>

      {/* Hamburger Menu Icon for Mobile */}
      <button
        className="text-white text-2xl md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <nav
        className={`absolute top-full left-0 w-full bg-primary flex flex-col items-start p-4 space-y-4 md:hidden transform transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link
          to="/HomePage"
          className="text-white hover:text-auButtomColor transition"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <a
          href="/about"
          className="text-white hover:text-auButtomColor transition"
          onClick={toggleMobileMenu}
        >
          About
        </a>
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
            <a
              href="/home-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Home Loan
            </a>
            <a
              href="/vehicle-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Vehicle Loan
            </a>
            <a
              href="/personal-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Personal Loan
            </a>
            <a
              href="/business-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
              onClick={toggleMobileMenu}
            >
              Business Loan
            </a>
          </div>
        </div>
        <a
          href="/contact"
          className="text-white hover:text-auButtomColor transition"
          onClick={toggleMobileMenu}
        >
          Contact
        </a>
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
            className="bg-auButtomColor px-5 py-2 rounded-lg text-black font-semibold hover:bg-auColor transition"
            onClick={toggleMobileMenu}
          >
            Get Started
          </Link>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8 text-lg">
        <Link
          to="/HomePage"
          className="text-white hover:text-auButtomColor transition hover:scale-110 duration-300"
        >
          Home
        </Link>
        <a
          href="/about"
          className="text-white hover:text-auButtomColor transition hover:scale-110 duration-300"
        >
          About
        </a>
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
            <a
              href="/home-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Home Loan
            </a>
            <a
              href="/vehicle-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Vehicle Loan
            </a>
            <a
              href="/personal-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Personal Loan
            </a>
            <a
              href="/business-loan"
              className="block px-4 py-2 hover:bg-auButtomColor hover:text-gray-900 transition"
            >
              Business Loan
            </a>
          </div>
        </div>
        <a
          href="/contact"
          className="text-white hover:text-auButtomColor transition hover:scale-110 duration-300"
        >
          Contact
        </a>
        {user ? (
          <div className="relative">
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
            className="bg-auButtomColor px-5 py-2 rounded-lg text-black font-semibold hover:bg-auColor transition hover:scale-105 duration-300"
          >
            Get Started
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
