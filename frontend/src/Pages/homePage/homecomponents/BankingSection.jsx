import React from "react";
import { Link } from "react-router-dom";
import bankingSection from "../../../assets/bankingsection.webp";

const BankingSection = () => {
  return (
    <>
      {/* Section Content */}
      <div className="px-4">
  <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 to-[#0a1a2a] text-white rounded-2xl py-6 sm:py-10 sm:px-12 lg:px-20 max-w-7xl h-auto mx-auto">
    <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center leading-tight sm:leading-normal">
      Enjoy A Banking Experience That Is Swift, Versatile, and Open.
    </h2>
    <p className="text-xs sm:text-base md:text-lg lg:text-xl text-center mb-2 sm:mb-4 leading-snug sm:leading-relaxed">
      Join now with <span className="font-semibold">INCENTUM</span> to get the
      latest Banking Solutions and start mining now.
    </p>
    <Link
      to="/Signup-Page"
      className="bg-white text-black font-medium text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 mt-2 sm:mt-4 rounded-lg hover:bg-yellow-300 transition flex items-center justify-center"
    >
      Get Started
    </Link>
  </div>
</div>



      {/* Image Section */}
      <div className="py-8 sm:py-14 max-w-7xl h-auto mx-auto px-4">
        <img
          src={bankingSection}
          alt="Banking Experience"
          className="w-full rounded-2xl "
        />
      </div>
    </>
  );
};

export default BankingSection;
