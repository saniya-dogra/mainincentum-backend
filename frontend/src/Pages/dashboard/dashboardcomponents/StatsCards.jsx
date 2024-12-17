import React from "react";

const StatsCards = () => {
  const stats = [
    { title: "Clients", value: 19, color: "text-blue-500" },
    { title: "In Progress", value: 22, color: "text-yellow-500" },
    { title: "Total Loan Revenue", value: 0, color: "text-green-500" },
    { title: "Application Pending", value: 0, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-6 px-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex items-center justify-center bg-white shadow-md rounded-md py-4`}
        >
          <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="ml-2 text-gray-700">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
