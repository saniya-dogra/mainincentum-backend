import React, { useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    pincode: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || !/^[A-Za-z]+( [A-Za-z]+)*$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain alphabets only and up to 32 characters.";
    } else if (formData.name.trim().length > 32) {
      newErrors.name = "Name must not exceed 32 characters.";
    }

    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    if (
      !formData.password ||
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters long and include both letters and numbers.";
    }

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    if (!validateForm()) {
      toast.error("Please fill all the fields correctly!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      // Make the API call to register the user
      await axios.post("http://localhost:8080/api/v1/users/register", formData);
      // Show success toast
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      // Redirect to login page after success
      navigate("/login-page");
    } catch (error) {
      console.error(error);
      // Show failure toast if registration failed
      toast.error("Registration failed! Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-image grid grid-cols-1 xl:grid-cols-2">
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

      <div className="flex items-center justify-center p-6 bg-opacity-80">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg">
          <h2 className="text-gray-200 text-3xl font-bold mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            {["name", "phoneNumber", "email", "pincode", "password", "confirmpassword"].map((field) => (
              <div key={field}>
                <input
                  name={field}
                  type={field === "password" || field === "confirmpassword" ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-lg mb-4 border ${errors[field] ? "border-red-500" : "border-gray-300"} rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
            <div className="flex items-center justify-center my-7">
              <div className="w-1/3 border-t border-gray-500"></div>
              <span className="mx-4 text-gray-500 text-lg sm:text-xl font-bold">Or</span>
              <div className="w-1/3 border-t border-gray-500"></div>
            </div>
            <p className="text-center text-gray-400 text-lg mt-6">
              Already registered?{" "}
              <Link to="/login-page" className="text-blue-400 underline hover:text-blue-500">
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
    
      {/* Ensure ToastContainer is properly rendered */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
