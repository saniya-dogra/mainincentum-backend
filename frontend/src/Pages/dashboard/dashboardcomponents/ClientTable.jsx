import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { UserContext } from "../../../contextapi/UserContext";
import { fetchFormsByUserId } from "../../../store/formOneSlice";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const { forms, loading, error } = useSelector((state) => state.form);

  useEffect(() => {
    console.log("User from UserContext:", user);
    const userIdToFetch = user?._id || "67d695b8cc63417ceacad2e7"; // Fallback to hardcoded ID
    if (userIdToFetch) {
      console.log("Fetching forms for user ID:", userIdToFetch);
      dispatch(fetchFormsByUserId(userIdToFetch));
    } else {
      console.log("No user ID available to fetch forms");
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Current forms in state:", forms);
  }, [forms]);

  const defaultUser = {
    _id: null,
    name: "Unknown User",
    email: "N/A",
    pincode: "N/A",
    phoneNumber: "N/A",
  };
  const displayUser = user || defaultUser;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col items-center p-6 bg-gradient-to-b from-blue-600 to-blue-300 text-white">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 mt-6 animate-pulse"
          onError={(e) => {
            e.target.src = "https://dummyimage.com/100x100/ccc/fff";
          }}
        />
        <button className="text-white hover:text-gray-100 cursor-pointer text-sm">
          ✏️ Edit Avatar
        </button>
        <div className="mt-8 w-full text-start">
          <p className="mt-4 flex gap-2 items-center hover:underline cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Personal Information
          </p>
          <p className="mt-4 flex gap-2 items-center hover:underline cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Applied Loans
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 bg-gray-100">
        <h2 className="text-sm sm:text-md font-medium mb-3 bg-blue-200 w-full sm:w-[20%] md:w-[40%] lg:w-[20%] text-center rounded-full p-2 flex gap-2 items-center group transition duration-300 ease-in-out hover:bg-blue-300 hover:scale-105 hover:shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 group-hover:animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-4 rounded-lg shadow-xl">
          {[
            { label: "Full Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Pincode", key: "pincode" },
            { label: "Contact", key: "phoneNumber" },
          ].map(({ label, key }, index) => (
            <div key={index} className="flex flex-col">
              <label className="block text-gray-700 font-semibold mb-1">{label}</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-500 transition"
                value={displayUser[key] || `Unknown ${label}`}
                readOnly
              />
            </div>
          ))}
        </div>

        <h2 className="text-sm sm:text-md font-medium mt-6 mb-3 bg-blue-200 w-full sm:w-[20%] md:w-[40%] lg:w-[20%] text-center rounded-full p-2 flex gap-2 items-center group transition duration-300 ease-in-out hover:bg-blue-300 hover:scale-105 hover:shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 group-hover:animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Loan Applications
        </h2>

        <div className="bg-white p-4 rounded-lg shadow-xl">
          {loading ? (
            <p className="text-gray-500 text-center">Loading loan applications...</p>
          ) : error ? (
            <p className="text-red-500 text-center">
              Error: {typeof error === "object" ? error.message || JSON.stringify(error) : error}
            </p>
          ) : forms.length === 0 ? (
            <p className="text-gray-500 text-center">No loan applications found.</p>
          ) : (
            forms.map((form) => (
              <div
                key={form._id}
                className="bg-blue-50 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-xl p-4 mb-4 shadow-md transform hover:scale-105 transition duration-300"
              >
                <div className="flex items-start sm:items-center">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl">
                    💰
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      {form.loanApplication?.loan_type || "Unknown Loan"}
                    </p>
                    <p className="text-gray-700 text-[13px]">
                      Amount Requested: {form.loanApplication?.loan_amount_required || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right mt-4 ml-16 sm:mt-0">
                  <p className="text-gray-500 text-xs mb-2">
                    {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                  <button
                    className={`px-4 py-2 rounded-lg text-white transition duration-300 ${
                      form.status === "Approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : form.status === "Rejected"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {form.status || "Pending"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;