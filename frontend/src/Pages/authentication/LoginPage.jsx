import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contextapi/UserContext";
import DOMPurify from "dompurify";

axios.defaults.withCredentials = true;

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const sanitizeInput = (input) => DOMPurify.sanitize(input);

  const validateForm = () => {
    const newErrors = {};
    const cleanPhoneNumber = sanitizeInput(formData.phoneNumber);
    const cleanPassword = sanitizeInput(formData.password);

    if (!cleanPhoneNumber || !/^\d{10}$/.test(cleanPhoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: sanitizeInput(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      // ✅ CORRECTED: Added '/' between VITE_API_URL and 'api/users/login'
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, formData, {
        withCredentials: true,
      });
      const { userId, ...userData } = response.data.data; // Destructure userId and rest of data
      const formattedUser = { id: userId, ...userData }; // Match Profile component expectation
      console.log("Setting user in context:", formattedUser);
      setUser(formattedUser);

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          navigate("/");
          window.location.reload();
        },
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      if (error.response?.status === 429) {
        toast.error("Too many login attempts. Please wait and try again.");
      } else {
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-image grid grid-cols-1 xl:grid-cols-2">
      <div className="flex flex-col w-full p-6 xl:p-12">
        <div className="flex flex-col justify-center h-2/3 mx-auto">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold leading-tight mt-20">
            Welcome <span className="text-blue-300">To The</span>{" "}
            <span className="text-blue-400">Realm Of</span> Modern{" "}
            <span className="text-blue-400">Banking!</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">2000+</h2>
              <p className="text-white text-base sm:text-lg">Registered Users</p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">₹ 5,00,00,000+</h2>
              <p className="text-white text-base sm:text-lg">Amount Disbursed</p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">₹ 10,00,000+</h2>
              <p className="text-white text-base sm:text-lg">Incentives Provided</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 bg-opacity-80">
        <div className="w-full max-w-md p-6 bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg -mt-12">
          <h2 className="text-gray-200 text-3xl font-bold mb-4">Login</h2>
          <p className="text-gray-400 text-lg mb-4">Glad you're back!</p>
          <form onSubmit={handleSubmit}>
            {["phoneNumber", "password"].map((field) => (
              <div key={field}>
                <input
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={
                    field === "phoneNumber"
                      ? "Enter your Mobile Number"
                      : "Enter Password"
                  }
                  value={formData[field]}
                  onChange={handleInputChange}
                  className={`w-full p-3 text-lg mb-4 border ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
            <p className="text-center text-gray-400 text-lg mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup-page"
                className="text-blue-400 underline hover:text-blue-500"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}