import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const formatIndianCurrency = (number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};

export default function EmiCalculator() {
  const [principle, setPrinciple] = useState(200000);
  const [interest, setInterest] = useState(24);
  const [tenure, setTenure] = useState(18);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // States to track invalid inputs
  const [isPrincipleInvalid, setIsPrincipleInvalid] = useState(false);
  const [isInterestInvalid, setIsInterestInvalid] = useState(false);
  const [isTenureInvalid, setIsTenureInvalid] = useState(false);

  // Maximum values
  const MAX_LOAN_AMOUNT = 10000000; // 1 crore
  const MAX_INTEREST = 30; // 30%
  const MAX_TENURE = 30; // 30 years

  useEffect(() => {
    calculateEMI();
  }, [principle, interest, tenure]);

  const calculateEMI = () => {
    const monthlyRate = interest / 12 / 100;
    const numPayments = tenure * 12;
    const emiValue =
      (principle * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPayment = emiValue * numPayments;
    const totalInterestValue = totalPayment - principle;

    setEmi(Math.round(emiValue));
    setTotalInterest(Math.round(totalInterestValue));
    setTotalAmount(Math.round(totalPayment));
  };

  const handlePrincipleChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      const parsedValue = value === "" ? "" : parseInt(value);
      if (parsedValue === "" || parsedValue <= MAX_LOAN_AMOUNT) {
        setPrinciple(parsedValue);
        setIsPrincipleInvalid(false); // Reset invalid state
      } else {
        setIsPrincipleInvalid(true); // Set invalid state
      }
    }
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      const parsedValue = value === "" ? "" : parseFloat(value);
      if (parsedValue === "" || parsedValue <= MAX_INTEREST) {
        setInterest(parsedValue);
        setIsInterestInvalid(false); // Reset invalid state
      } else {
        setIsInterestInvalid(true); // Set invalid state
      }
    }
  };

  const handleTenureChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(value)) {
      const parsedValue = value === "" ? "" : parseInt(value);
      if (parsedValue === "" || parsedValue <= MAX_TENURE) {
        setTenure(parsedValue);
        setIsTenureInvalid(false); // Reset invalid state
      } else {
        setIsTenureInvalid(true); // Set invalid state
      }
    }
  };

  const chartData = {
    labels: ["Principal Amount", "Interest Amount"],
    datasets: [
      {
        data: [principle || 0, totalInterest], // Use 0 if principle is empty
        backgroundColor: ["#4caf50", "#ff5722"],
        hoverBackgroundColor: ["#81c784", "#ff8a65"],
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#010080] to-[#0A1536] text-white">
      <div className="w-full max-w-5xl backdrop-blur-lg shadow-xl rounded-lg p-4 md:p-8 lg:p-12 mt-5 mb-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-4 md:mb-8">
          EMI Calculator
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Section */}
          <div className="space-y-4 md:space-y-8">
            {/* Loan Amount */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md">
              <label className="flex justify-between text-base sm:text-lg font-semibold text-white">
                Loan Amount
                <span className="text-green-400">
                  ₹ {principle === "" ? 0 : formatIndianCurrency(principle)}
                </span>
              </label>
              <input
                type="number"
                value={principle}
                onChange={handlePrincipleChange}
                className={`w-full mt-2 md:mt-4 bg-gray-700 text-white rounded p-2 ${
                  isPrincipleInvalid ? "border-b-2 border-red-500" : ""
                }`}
                max={MAX_LOAN_AMOUNT}
              />
              {isPrincipleInvalid && (
                <p className="text-red-500 text-sm mt-1">
                  Maximum loan amount is ₹1 crore.
                </p>
              )}
              <input
                type="range"
                min="10000"
                max={MAX_LOAN_AMOUNT}
                step="5000"
                value={principle || 0}
                onChange={handlePrincipleChange}
                className="w-full mt-2 md:mt-4 accent-green-400"
              />
            </div>

            {/* Interest Rate */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md">
              <label className="flex justify-between text-base sm:text-lg font-semibold text-white">
                Rate of Interest (p.a.)
                <span className="text-green-400">{interest === "" ? 0 : interest} %</span>
              </label>
              <input
                type="number"
                value={interest}
                onChange={handleInterestChange}
                className={`w-full mt-2 md:mt-4 bg-gray-700 text-white rounded p-2 ${
                  isInterestInvalid ? "border-b-2 border-red-500" : ""
                }`}
                max={MAX_INTEREST}
              />
              {isInterestInvalid && (
                <p className="text-red-500 text-sm mt-1">
                  Maximum interest rate is 30%.
                </p>
              )}
              <input
                type="range"
                min="1"
                max={MAX_INTEREST}
                step="0.1"
                value={interest || 0}
                onChange={handleInterestChange}
                className="w-full mt-2 md:mt-4 accent-green-400"
              />
            </div>

            {/* Loan Tenure */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-md">
              <label className="flex justify-between text-base sm:text-lg font-semibold text-white">
                Loan Tenure
                <span className="text-green-400">{tenure === "" ? 0 : tenure} Yr</span>
              </label>
              <input
                type="number"
                value={tenure}
                onChange={handleTenureChange}
                className={`w-full mt-2 md:mt-4 bg-gray-700 text-white rounded p-2 ${
                  isTenureInvalid ? "border-b-2 border-red-500" : ""
                }`}
                max={MAX_TENURE}
              />
              {isTenureInvalid && (
                <p className="text-red-500 text-sm mt-1">
                  Maximum tenure is 30 years.
                </p>
              )}
              <input
                type="range"
                min="1"
                max={MAX_TENURE}
                step="1"
                value={tenure || 0}
                onChange={handleTenureChange}
                className="w-full mt-2 md:mt-4 accent-green-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center space-y-4 md:space-y-8">
            <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md text-center w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-green-400">
                EMI Details
              </h2>
              <div className="mt-2 md:mt-4 space-y-2 md:space-y-3">
                <p className="text-base sm:text-lg font-medium text-white">
                  Monthly EMI: ₹ {formatIndianCurrency(emi)}
                </p>
                <p className="text-base sm:text-lg font-medium text-white">
                  Principal: ₹ {principle === "" ? 0 : formatIndianCurrency(principle)}
                </p>
                <p className="text-base sm:text-lg font-medium text-white">
                  Total Interest: ₹ {formatIndianCurrency(totalInterest)}
                </p>
                <p className="text-base sm:text-lg font-medium text-white">
                  Total Amount: ₹ {formatIndianCurrency(totalAmount)}
                </p>
              </div>
            </div>
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72">
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}