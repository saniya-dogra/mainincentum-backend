import React, { useContext } from "react";
import { HomeOneContext } from "../../contextapi/HomeOneContext";

const Dashboard = () => {

  const { user } = useContext(HomeOneContext)
    const loanApplications = [
        {
          id: 1,
          type: "HOME LOAN",
          amount: "₹ 9,00,000",
          date: "4th Aug 2020 at 6:30pm",
          status: "In Progress",
          icon: "🏠",
        },
        {
          id: 2,
          type: "CAR LOAN",
          amount: "₹ 4,50,000",
          date: "10th Sep 2021 at 5:45pm",
          status: "In Progress",
          icon: "🚗",
        },
        {
          id: 3,
          type: "EDUCATION LOAN",
          amount: "₹ 2,00,000",
          date: "12th Jan 2022 at 3:15pm",
          status: "In Progress",
          icon: "🎓",
        },
      ];
      


  return (
    <div className="flex min-h-screen bg-white">
      
      <div className="w-64 flex flex-col items-center  p-6">
        {/* Avatar */}
        <img
          src="https://via.placeholder.com/100"
          alt="avatar"
          className="w-32 h-32 rounded-lg  mb-4 mt-6"
        />
        <button className="text-blue-500 hover:text-blue-700 cursor-pointer text-sm">
          <span role="img" aria-label="edit">✏️</span> Edit Avatar
        </button>
        {/* Sidebar Menu */}
        <div className="mt-8 ml-16  w-full text-start">
          <p className="mt-4 text-gray-600 cursor-pointer">Personal Information</p>
          {/* <hr className="border-t-1 border-gray-300" /> */}
          <p className="mt-4 text-gray-600 cursor-pointer">Applied Loans</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white mt-4 rounded-lg mx-8">
        {/* Personal Information */}
        <h2 className="text-lg font-medium mb-6 bg-blue-200 mix-w-full w-[20%] text-center rounded-full py-1">Personal Information</h2>
        <div className="grid grid-cols-3 gap-6 mb-8 bg-gray-200 p-4 rounded-lg">
        <div className="flex flex-col">
  <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
  {user ? (
    <input
      type="text"
      placeholder="Full Name"
      className="w-full border border-gray-300 rounded-lg p-2"
      value={user?.data[0]?.full_name ?? 'hey'}
    />
  ) : (
    <p>Loading...</p>
  )}
</div>
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold mb-1">Pincode</label>
            <input
              type="text"
              placeholder="Pincode"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col">
  <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
  {user ? (
    <input
      type="text"
      placeholder="Full Name"
      className="w-full border border-gray-300 rounded-lg p-2"
      value={user?.data[0]?.email_id ?? 'hey'}
    />
  ) : (
    <p>Loading...</p>   
  )}
</div>
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold mb-1">Contact Number </label>
            <input
              type="text"
              placeholder="Contact Number"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        {/* Loan Applications */}
        
        <h2 className="text-lg font-medium mb-6 bg-blue-200 w-[20%] text-center rounded-full py-1">
          Loan Applications
        </h2>
        <div className="bg-gray-200 p-4 rounded-lg">
          {loanApplications.map((loan) => (
            <div
              key={loan.id}
              className="bg-white flex justify-between items-center rounded-2xl p-4 mb-4 shadow-md"
            >
              <div className="flex items-center">
                <div className="bg-blue-300 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">{loan.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{loan.type}</p>
                  <p className="text-gray-700">Amount Requested: {loan.amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-2">{loan.date}</p>
                <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
                  {loan.status}
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
    </div>
  );
};

export default Dashboard;
