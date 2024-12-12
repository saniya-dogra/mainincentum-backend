import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa"; // Dropdown icon
import rupee from "../../assets/rupee.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
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
        <Link
          to="/Login-Page"
          className="bg-[#F5C13D] px-5 py-2 rounded-lg text-black font-semibold hover:bg-[#F5C13D] transition"
        >
          Get Started
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-[#010059] text-white shadow-lg md:hidden flex flex-col space-y-6 p-6 z-50">
          <Link
            to="/HomePage"
            className="text-white hover:text-[#F5C13D] transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="/about"
            className="hover:text-[#F5C13D] transition text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <div className="relative">
            <button
              className="hover:text-[#F5C13D] transition text-lg flex items-center justify-between"
              onClick={toggleServicesDropdown}
            >
              Services
              <FaChevronDown className="ml-2" />
            </button>
            {isServicesDropdownOpen && (
              <div className="bg-gray-800 text-white mt-2 rounded-lg shadow-lg w-full z-50">
                <a
                  href="/home-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home Loan
                </a>
                <a
                  href="/vehicle-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vehicle Loan
                </a>
                <a
                  href="/personal-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Personal Loan
                </a>
                <a
                  href="/business-loan"
                  className="block px-4 py-2 hover:bg-[#F5C13D] hover:text-gray-900 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Business Loan
                </a>
              </div>
            )}
          </div>
          <a
            href="/contact"
            className="hover:text-[#F5C13D] transition text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <Link
            to="/Login-Page"
            className="bg-[#F5C13D] px-5 py-2 rounded-lg text-black font-semibold hover:bg-[#F5C13D] transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
