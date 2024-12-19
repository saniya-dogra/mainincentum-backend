import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ClientApplication = () => {
  const [applications, setApplications] = useState([
    {
      fullName: "Aimee",
      loanAmount: "50,00,000",
      applicationNo: "21001",
      email: "ututopro@gmail.com",
      contactNumber: "6479949992",
      pincode: "411014",
      status: "In Process",
    },
    {
      fullName: "Aimee",
      loanAmount: "50,00,000",
      applicationNo: "21001",
      email: "ututopro@gmail.com",
      contactNumber: "6479949992",
      pincode: "411014",
      status: "In Process",
    },{
      fullName: "Aimee",
      loanAmount: "50,00,000",
      applicationNo: "21001",
      email: "ututopro@gmail.com",
      contactNumber: "6479949992",
      pincode: "411014",
      status: "In Process",
    },{
      fullName: "Aimee",
      loanAmount: "50,00,000",
      applicationNo: "21001",
      email: "ututopro@gmail.com",
      contactNumber: "6479949992",
      pincode: "411014",
      status: "In Process",
    },{
      fullName: "Aimee",
      loanAmount: "50,00,000",
      applicationNo: "21001",
      email: "ututopro@gmail.com",
      contactNumber: "6479949992",
      pincode: "411014",
      status: "In Process",
    },{
      fullName: "Aimee",
      loanAmount: "50,00,000",
      applicationNo: "21001",
      email: "ututopro@gmail.com",
      contactNumber: "6479949992",
      pincode: "411014",
      status: "In Process",
    },
      ]);

  return (
    <div className="p-6 bg-gray-100 font-sans text-sm">
      {/* Header */}
      <div className="flex justify-start items-center mb-2 gap-2">
        <img
          src="https://via.placeholder.com/35"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        <Link 
        to="/client-application"
        className="text-lg font-semibold">Clients Application
        </Link>
      
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-start gap-4 mb-4">
  <select className="border border-gray-300 p-2 rounded w-60">
    <option>Application Status</option>
    <option>In Progress</option>
    <option>Closed</option>
    <option>Pending</option>
  </select>
  <input
    type="date"
    className="border border-gray-300 p-2 rounded w-60"
  />
  <select className="border border-gray-300 p-2 rounded w-60">
    <option>Pin Code</option>
    <option>411011</option>
    <option>411012</option>
    <option>411013</option>
    <option>411014</option>
    <option>411015</option>
    <option>411016</option>
  </select>
  <select className="border border-gray-300 p-2 rounded w-60">
    <option>Select </option>
  </select>
</div>


      {/* Table */}
      <div className="overflow-auto border border-gray-300">
        <table className="w-full text-center">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border">
                <input type="checkbox" />
              </th>
              <th className="p-3 border">Profile</th>
              <th className="p-3 border">Full Name</th>
              <th className="p-3 border">Loan Amount</th>
              <th className="p-3 border">Application No</th>
              <th className="p-3 border">Email ID</th>
              <th className="p-3 border">Contact Number</th>
              <th className="p-3 border">Pincode</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 !== 0 ? "bg-blue-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="p-3 border">
                  <input type="checkbox" />
                </td>
                <td className="p-3 border">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                    👤
                  </div>
                </td>
                <td className="p-3 border">{app.fullName}</td>
                <td className="p-3 border">{app.loanAmount}</td>
                <td className="p-3 border">{app.applicationNo}</td>
                <td className="p-3 border">{app.email}</td>
                <td className="p-3 border">{app.contactNumber}</td>
                <td className="p-3 border">{app.pincode}</td>
                <td className="p-3 border">
                  <span
                    className={`${
                      app.status === "Opened"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-3 border space-x-2">
                <Link 
                    to="/user-applications"
                    className="text-blue-600 hover:underline"> VIEW  ✏️
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span>Showing 8 to 10 of 10 entries</span>
        <div className="flex gap-1">
          <button className="border px-2 py-1 rounded hover:bg-gray-200">1</button>
          <button className="border px-2 py-1 rounded bg-blue-500 text-white">
            2
          </button>
          <button className="border px-2 py-1 rounded hover:bg-gray-200">
            3
          </button>
          <button className="border px-2 py-1 rounded">...</button>
          <button className="border px-2 py-1 rounded hover:bg-gray-200">
            40
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientApplication;
