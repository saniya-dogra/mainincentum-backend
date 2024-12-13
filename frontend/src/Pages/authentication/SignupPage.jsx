// SignupPage.js
import React, { useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function SignupPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({}); // Object to track field errors

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Name: Only alphabets and spaces, max 32 characters
    if (!name || !/^[A-Za-z ]{1,32}$/.test(name)) {
      newErrors.name = "Name must be alphabets only and up to 32 characters.";
    }

    // Phone number: Exactly 10 digits
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    // Email: Valid email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Pincode: Exactly 6 digits
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  async function handleFormSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      await axios.post(
        'http://127.0.0.1:8000/signup',
        {
          name,
          email,
          phoneNumber,
          pincode,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Necessary header
          },
          withCredentials: true, // Enable credentials
        }
      );
      alert("Registration successful"); // Show success message
    } catch (error) {
      alert("Failed registration"); // Show error message
      console.error(error); // Log the error for debugging
    }
  }
  
  return (
    <div className="min-h-screen bg-image grid grid-cols-1 xl:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col w-full p-6 xl:p-12">
        <div className="flex flex-col justify-center h-2/3 mx-auto">
          <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight">
            Welcome <span className="text-blue-300">To The</span>{" "}
            <span className="text-blue-400">Realm Of</span> Modern{" "}
            <span className="text-blue-400">Banking!</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">1Million+</h2>
              <p className="text-white text-lg">Registered Businesses</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">$1Billion+</h2>
              <p className="text-white text-lg">Monthly Payments Value</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">1Million+</h2>
              <p className="text-white text-lg">Daily Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center p-6 bg-opacity-80">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
          <h2 className="text-gray-200 text-3xl font-bold mb-4">Signup</h2>
          <p className="text-gray-400 text-lg mb-4">
            Just a few details to get you started!
          </p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Name"
              className={`w-full p-3 text-lg mb-4 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^A-Za-z ]/g, ""))} // Allow only alphabets and spaces
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="tel"
              placeholder="Phone Number"
              className={`w-full p-3 text-lg mb-4 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/[^0-9]/g, "")) // Allow only digits
              }
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}

            <input
              type="email"
              placeholder="Email ID"
              className={`w-full p-3 text-lg mb-4 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
              type="text"
              placeholder="Pincode"
              className={`w-full p-3 text-lg mb-4 border ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={pincode}
              onChange={(e) =>
                setPincode(e.target.value.replace(/[^0-9]/g, "")) // Allow only digits
              }
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
            <input
              type="text"
              placeholder="password"
              className={`w-full p-3 text-lg mb-4 border  rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value) // Allow only digits
              }
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Verify
            </button>

            <div className="flex items-center justify-center my-7">
              <div className="w-1/3 border-t border-gray-500"></div>
              <span className="mx-4 text-gray-500 text-lg sm:text-xl font-bold">
                Or
              </span>
              <div className="w-1/3 border-t border-gray-500"></div>
            </div>
            <p className="text-center text-gray-400 text-lg mt-6">
              Already registered?{" "}
              <Link
                to="/login-page"
                className="text-blue-400 underline hover:text-blue-500"
              >
                Login
              </Link>
            </p>
            <div className="flex justify-center gap-4 text-gray-500 text-sm sm:text-base mt-7">
              <Link to="#">Terms & Conditions</Link>
              <Link to="#">Support</Link>
              <Link to="#">Customer Care</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
