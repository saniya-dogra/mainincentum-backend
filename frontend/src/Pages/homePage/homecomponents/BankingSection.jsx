import React from "react";
import { Link } from "react-router-dom";
import bankingSection from "../../../assets/bankingsection.webp";

const BankingSection = () => {
  return (
    <>
      {/* Section Content */}
      <section className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 to-[#0a1a2a] text-white rounded-3xl  px-6 sm:py-12 sm:px-12 lg:px-16 max-w-7xl h-auto mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
          Enjoy A Banking Experience That Is Swift, Versatile, And Open.
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mb-2">
          Join now with <span className="font-semibold">INCENTUM</span> to get the
          latest Banking Solutions and start mining now.
        </p>
        <Link
          to="/Signup-Page"
          className="bg-white text-black font-medium px-4 py-2 sm:px-6 sm:py-3 mt-4 rounded-lg hover:bg-yellow-300 transition flex items-center"
        >
          Get Started
        </Link>
      </section>

      {/* Image Section */}
      <div className="py-10 sm:py-14 max-w-7xl h-auto mx-auto">
        <img
          src={bankingSection}
          alt="Sample Content"
          className="w-full rounded-3xl shadow-lg"
        />
      </div>
    </>
  );
};

export default BankingSection;
