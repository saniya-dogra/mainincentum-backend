import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFormById, updateFormStatus } from "../../store/formOneSlice";

const UserApplications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentForm, loading, error } = useSelector((state) => state.form);

  console.log("Received ID from useParams:", id);
  console.log("Current Form:", currentForm);
  console.log("Loading:", loading, "Error:", error);

  useEffect(() => {
    if (id) {
      console.log("Fetching form with ID:", id);
      dispatch(fetchFormById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentForm && currentForm.status) {
      setSelectedStatus(currentForm.status);
      console.log("Initial status set to:", currentForm.status);
    }
  }, [currentForm]);

  const handleStatusChange = async (status) => {
    setSelectedStatus(status);
    setShowDropdown(false);
    console.log("Attempting to update status to:", status);

    try {
      const response = await dispatch(updateFormStatus({ id, status })).unwrap();
      console.log("Status updated successfully:", response);
      await dispatch(fetchFormById(id)); // Refresh form data
    } catch (err) {
      console.error("Failed to update status:", err);
      alert(`Failed to update status: ${err.status ? `${err.status} - ${err.data?.message || err.message}` : err.message || "Unknown error"}`);
    }
  };

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-center mt-10 text-red-500">
        Error: {typeof error === "string" ? error : error.message || "Something went wrong"}
      </h1>
    );
  }

  if (!currentForm) {
    return <h1 className="text-center mt-10">No data found for this application</h1>;
  }

  const personalDetail = currentForm.personalDetails?.[0] || {};
  const loanApplication = currentForm.loanApplication || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <div className="flex">
          <div className="w-1/5 bg-[#FFFCEE] border-r">
            <div className="flex flex-col items-center py-6">
              <img
                src="https://via.placeholder.com/70"
                alt="Profile"
                className="w-20 h-20 rounded-full mb-2"
              />
              <h3 className="text-lg font-semibold">{personalDetail.full_name || "N/A"}</h3>
            </div>

            <ul className="space-y-3 px-6">
              <li className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-user text-gray-400 mr-2"></i> View Profile
              </li>
              <li className="flex items-center text-gray-700 font-medium">
                <i className="fas fa-file-alt text-gray-400 mr-2"></i> Documents
              </li>
            </ul>
            <li className="mt-14 px-6 flex items-center text-gray-700 font-medium">
              <i className="fas fa-file-alt text-gray-400 mr-2"></i> Application Status
            </li>

            <div className="relative mt-3 px-6">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {selectedStatus || "Change Status"}
                <i className="fas fa-chevron-down ml-2"></i>
              </button>

              {showDropdown && (
                <ul className="absolute bg-white border rounded-md shadow-md mt-1 w-48 z-10">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange("Pending")}
                  >
                    Pending
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange("Approved")}
                  >
                    Approved
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleStatusChange("Rejected")}
                  >
                    Rejected
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className="w-4/5 p-6">
            <div className="flex justify-between items-center rounded-lg bg-[#ECEAEA] mb-4">
              <h2 className="text-xl m-5 font-semibold">{personalDetail.full_name || "N/A"}</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Attachment
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 border-b pb-6">
              <div>
                <h3 className="text-md font-semibold mb-2">Personal Information</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Birth Date:</span>{" "}
                  {personalDetail.date_of_birth || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Gender:</span>{" "}
                  {personalDetail.gender || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Contact No:</span>{" "}
                  {personalDetail.mobile_number || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Email Id:</span>{" "}
                  {personalDetail.email_id || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Additional Details</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Father Name:</span>{" "}
                  {personalDetail.father_name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Marital Status:</span>{" "}
                  {personalDetail.marital_status || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Resident:</span>{" "}
                  {personalDetail.resident || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Employment Details</h3>
                <p className="text-sm text-gray-800">
                  <span className="font-medium text-blue-600">Qualification:</span>{" "}
                  {personalDetail.qualification || "N/A"}
                </p>
                <p className="text-sm text-gray-800">
                  <span className="font-medium text-blue-600">Employment Type:</span>{" "}
                  {personalDetail.user_type || "N/A"}
                </p>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Address</h3>
                <p className="text-sm text-gray-800">
                  <span className="font-medium text-blue-600">Address:</span>{" "}
                  {personalDetail.permanent_address || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Pin Code:</span>{" "}
                  {personalDetail.permanent_pincode || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold mb-2">Application Status</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Application No:</span>{" "}
                {currentForm._id || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Loan Type:</span>{" "}
                {loanApplication.loan_type || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Loan Amount:</span>{" "}
                {loanApplication.loan_amount_required || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Status:</span>{" "}
                {selectedStatus || currentForm.status || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 bg-gray-50">
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <i className="fas fa-save mr-2"></i> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserApplications;