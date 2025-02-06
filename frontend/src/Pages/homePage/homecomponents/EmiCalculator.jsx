import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export default function EmiCalculator() {
  const [principle, setPrinciple] = useState(200000);
  const [interest, setInterest] = useState(24);
  const [tenure, setTenure] = useState(18);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const monthlyRate = interest / 12 / 100;
    const numPayments = tenure * 12;
    const emiValue =
      (principle * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = emiValue * numPayments;
    const totalInterestValue = totalPayment - principle;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
    setTotalAmount(totalPayment.toFixed(2));
  }, [principle, interest, tenure]);

  const chartData = {
    labels: ["Principal Amount", "Interest Amount"],
    datasets: [
      {
        data: [principle, totalInterest],
        backgroundColor: ["#4caf50", "#ff5722"],
        hoverBackgroundColor: ["#81c784", "#ff8a65"],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#010080] to-[#0A1536] text-white">
      <div className="w-full max-w-5xl  backdrop-blur-lg shadow-xl rounded-lg p-8 mt-5 mb-5 md:p-12">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          EMI Calculator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="space-y-8">
            {/* Loan Amount */}
            <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md">
              <label className="flex justify-between text-lg font-semibold text-white">
                Loan Amount
                <span className="text-green-400">₹ {principle.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="100000"
                max="100000000"
                step="50000"
                value={principle}
                onChange={(e) => setPrinciple(parseInt(e.target.value))}
                className="w-full mt-4 accent-green-400"
              />
            </div>

            {/* Interest Rate */}
            <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md">
              <label className="flex justify-between text-lg font-semibold text-white">
                Rate of Interest (p.a.)
                <span className="text-green-400">{interest} %</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={interest}
                onChange={(e) => setInterest(parseFloat(e.target.value))}
                className="w-full mt-4 accent-green-400"
              />
            </div>

            {/* Loan Tenure */}
            <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md">
              <label className="flex justify-between text-lg font-semibold text-white">
                Loan Tenure
                <span className="text-green-400">{tenure} Yr</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(parseInt(e.target.value))}
                className="w-full mt-4 accent-green-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center w-full">
              <h2 className="text-2xl font-bold text-green-400">EMI Details</h2>
              <div className="mt-4 space-y-3">
                <p className="text-lg font-medium text-white bg-blue ">
                  Monthly EMI: ₹ {emi.toLocaleString()}
                </p>
                <p className="text-lg font-medium text-white">
                  Principal: ₹ {principle.toLocaleString()}
                </p>
                <p className="text-lg font-medium text-white">
                  Total Interest: ₹ {totalInterest.toLocaleString()}
                </p>
                <p className="text-lg font-medium text-white">
                  Total Amount: ₹ {totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="w-72 h-72">
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
