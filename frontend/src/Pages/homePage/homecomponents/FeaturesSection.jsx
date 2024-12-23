import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeloan from '../../../assets/homeloan.webp';
import vehicleloan from '../../../assets/vehicleloan.webp';
import personalloan from '../../../assets/personalloan.webp';
import businessloan from '../../../assets/businessloan.webp';
import incentmbenfi from '../../../assets/incentmbenfi.webp';

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("home-loan");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
    setActiveTab(id);
  };

  return (
    <>
      <div className="bg-[#e5e5e5]">
        {/* Header Navbar */}
        <div className="sticky top-0 z-10">
          <div className="container mx-auto flex justify-center py-2 pt-3 px-4 sm:px-0">
            <div className="flex bg-gradient-to-b from-[#e8f4fd] to-[#dfe1f6] shadow-md rounded-full px-2 py-1 space-x-2 sm:space-x-6 border border-[#14296d]">
              {[
                { id: "home-loan", label: "Home Loan" },
                { id: "car-loan", label: "Car Loan" },
                { id: "personal-loan", label: "Personal Loan" },
                { id: "business-loan", label: "Business Loan" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-3 sm:px-7 py-2 sm:py-3 rounded-full text-xs sm:text-xl font-semibold ${
                    activeTab === tab.id
                      ? "text-black font-bold bg-gradient-to-r from-[#f5fafe] to-[#ffffff]"
                      : "text-gray-500 hover:text-black"
                  }`}
                  onClick={() => scrollToSection(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>


        {/* Loan Sections */}
        <div className="container mx-auto  space-y-10">
          {/* Home Loan */}
          <div
            id="home-loan"
            className="flex flex-col md:flex-row items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <div className="p-4 md:w-1/2 flex justify-center">
              <Link to="/home-loan">
                <img
                  src={homeloan}
                  alt="Home Loan Graph"
                  className="rounded-lg w-full max-w-md"
                />
              </Link>
            </div>
            <div className="p-4 md:w-2/3 text-center md:text-left">
              <span className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                HOME LOAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Find Your Dream <span className="text-blue-700">Home</span> With Our
                <span className="text-blue-700"> Home Loan</span> Solution
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Owning a home should be a joyous experience, not a source of stress.
                We understand that purchasing a home is one of the most significant
                financial decisions you'll ever make. That’s why we’ve developed
                AI-powered home loan solutions that give you access...
              </p>
              <div className="mt-10">
                <Link
                  to="/home-loan"
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl border border-black hover:bg-yellow-300 transition"
                >
                  Know More →
                </Link>
              </div>
            </div>
          </div>

          {/* Vehicle Loan */}
          <div
            id="car-loan"
            className="flex flex-col md:flex-row items-center justify-center hover:bg-white transition-colors"
          >
            <div className="p-4 md:w-1/2 flex justify-center">
              <Link to="/vehicle-loan">
                <img
                  src={vehicleloan}
                  alt="Car Loan Graph"
                  className="rounded-lg w-full max-w-md"
                />
              </Link>
            </div>
            <div className="p-4 md:w-2/3 text-center md:text-left">
              <span className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                VEHICLE LOAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Unlock Your Dream <span className="text-blue-700">Car</span> With Our
                <span className="text-blue-700"> Vehicle Loan</span> Solution
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Get competitive rates and flexible terms tailored to your needs.
                Whether you're a first-time buyer or looking to refinance, our
                expert team is here to guide you every step of the way.
              </p>
              <div className="mt-10">
                <Link
                  to="/vehicle-loan"
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl border border-black hover:bg-yellow-300 transition"
                >
                  Know More →
                </Link>
              </div>
            </div>
          </div>

          {/* Personal Loan */}
          <div
            id="personal-loan"
            className="flex flex-col md:flex-row items-center justify-center hover:bg-white transition-colors"
          >
            <div className="p-4 md:w-1/2 flex justify-center">
              <Link to="/personal-loan">
                <img
                  src={personalloan}
                  alt="Personal Loan Graph"
                  className="rounded-lg w-full max-w-md"
                />
              </Link>
            </div>
            <div className="p-4 md:w-2/3 text-center md:text-left">
              <span className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                PERSONAL LOAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Unlock Your <span className="text-blue-700">Work</span> With Our
                <span className="text-blue-700"> Personal Loan</span> Solution!
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Get competitive rates and flexible terms tailored to your needs.
                Whether you're a first-time buyer or looking to refinance, our
                expert team is here to guide you every step of the way.
              </p>
              <div className="mt-10">
                <Link
                  to="/personal-loan"
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl border border-black hover:bg-yellow-300 transition"
                >
                  Know More →
                </Link>
              </div>
            </div>
          </div>

          {/* Business Loan */}
          <div
            id="business-loan"
            className="flex flex-col md:flex-row items-center justify-center hover:bg-white transition-colors"
          >
            <div className="p-4 md:w-1/2 flex justify-center">
              <Link to="/business-loan">
                <img
                  src={businessloan}
                  alt="Business Loan Graph"
                  className="rounded-lg w-full max-w-md"
                />
              </Link>
            </div>
            <div className="p-4 md:w-2/3 text-center md:text-left">
              <span className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                BUSINESS LOAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Unlock Your Startup <span className="text-blue-700">/Business</span> With Our
                <span className="text-blue-700"> Business Loan</span> Solution!
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Get competitive rates and flexible terms tailored to your needs.
                Whether you're a first-time buyer or looking to refinance, our
                expert team is here to guide you every step of the way.
              </p>
              <div className="mt-10">
                <Link
                  to="/business-loan"
                  className="px-4  py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl border border-black hover:bg-yellow-300 transition"
                >
                  Know More →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 px-4 max-w-7xl mx-auto">
          <img
            src={incentmbenfi}
            alt="Benefits Graph"
            className="rounded-lg w-full"
          /> 
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;
