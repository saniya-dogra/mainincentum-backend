import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const UserApplications = ({id}) => {
    const [showDropdown, setShowDropdown] = useState(false);
     
    const allUser = useSelector((state) => state.form.forms);
    // const singleUser = forms?.data.filter((form) => form.id === id);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowDropdown(false); 
  };

  // if(loading){
  //   return <h1>Loading...</h1>
  // }

  // if(error){
  //   return <h1>Error: {error.message}</h1> 
  // }

  // if(!formData){
  //   return <h1>No data found</h1>
  // }

      return (
        <div className="min-h-screen bg-gray-50 p-4">
          {/* Main Container */}
          <div className="bg-white rounded-md shadow-md overflow-hidden">
            <div className="flex">
              {/* Sidebar */}
              <div className="w-1/5 bg-[#FFFCEE] border-r">
                <div className="flex flex-col items-center py-6">
                  {/* Profile Image */}
                  <img
                    src="https://via.placeholder.com/70"
                    alt="Profile"
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <h3 className="text-lg font-semibold">prinnce</h3>
                </div>
    
                {/* Sidebar Menu */}
                <ul className="space-y-3 px-6">
                  <li className="flex items-center text-gray-700 font-medium">
                    <i className="fas fa-user text-gray-400 mr-2"></i> View Profile
                  </li>
                  <li className="flex items-center text-gray-700 font-medium">
                    <i className="fas fa-file-alt text-gray-400 mr-2"></i> Documents
                  </li>
                </ul>
                <li className="mt-14 px-6 flex items-center text-gray-700 font-medium">
                    <i className="fas fa-file-alt text-gray-400 mr-2"></i> Application satus
                  </li>
                  

        <div className="relative mt-3 px-6">
        <button
          className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={() => setShowDropdown(!showDropdown)}
        >
         
          <i className="fas fa-chevron-down ml-2"></i>
        </button>

        {showDropdown && (
          <ul className="absolute bg-white border rounded-md shadow-md mt-1 w-48 z-10">
            <li
              className="px-4 py-2  hover:bg-gray-100 cursor-pointer"
              onClick={() => handleStatusChange("In Process")}
            >
              In Process
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleStatusChange("Closed")}
            >
              Closed
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleStatusChange("Pending")}
            >
              Pending
            </li>
          </ul>
        )}
         </div>
              </div>
    
              {/* Main Content */}
              <div className="w-4/5 p-6">
                {/* Top Header */}
                <div className="flex justify-between items-center rounded-lg bg-[#ECEAEA] mb-4">
                  <h2 className="text-xl m-5 font-semibold">Aimee Liu</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Attachment
                    </button>
                </div>
    
                {/* Personal Information Section */}
                <div className="grid grid-cols-2 gap-6 border-b pb-6">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-md font-semibold mb-2">Personal Information</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Birth Date:</span> 09 Jan 2004
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Gender:</span> Female
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Contact No:</span> 987654321
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Email Id:</span> Aaaaaa@gmail.com
                    </p>
                  </div>
    
                  {/* Right Column */}
                  <div>
                    <h3 className="text-md font-semibold mb-2">Additional Details</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Father Name:</span> Mongo DB
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Marital Status:</span> Single
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Resident:</span> Indian
                    </p>
                  </div>
    
                  {/* Employment Details */}
                  <div>
                    <h3 className="text-md font-semibold mb-2">Employment Details</h3>
                    <p className="text-sm text-gray-800">
                      <span className="font-medium text-blue-600">Qualification:</span> Graduation
                    </p>
                    <p className="text-sm text-gray-800">
                      <span className="font-medium text-blue-600">Employment Type:</span> Salaried
                    </p>
                  </div>
    
                  {/* Address */}
                  <div>
                    <h3 className="text-md font-semibold mb-2">Address</h3>
                    <p className="text-sm text-gray-800">
                      <span className="font-medium text-blue-600">Address:</span>{" "}
                      XXXXXXXXXXXXXXXXXXXXXXXXX
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">Pin Code:</span> 647994
                    </p>
                  </div>
                </div>
    
                {/* Application Status Section */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2">Application Status</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Application No:</span> 21212
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Loan Type:</span> Car Loan
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Parents Contact:</span> 6479949992
                  </p>
                </div>
              </div>
            </div>
    
            {/* Bottom Save Button */}
            <div className="flex justify-end p-4 bg-gray-50">
              <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <i className="fas fa-save "></i> Save
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default UserApplications;
    