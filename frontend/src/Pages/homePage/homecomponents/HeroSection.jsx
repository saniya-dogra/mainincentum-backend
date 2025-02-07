import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
<div className="bg-[url('/herobgimage.webp')] bg-cover bg-center">
<section className="bg-transparent text-white relative py-24 sm:py-36 px-8 md:px-12">
    <div className="flex justify-center">
      <div className="inline-flex items-center justify-center bg-blue-800/50 border border-blue-500 rounded-full px-6 py-1.5 text-sm mb-10">
        <span className="text-lg mr-2">✨</span>
        <span>Next-Gen Business Banking</span>
      </div>
    </div>
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
      <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
        Welcome <span className="text-blue-400">To The</span>{" "}
        <span className="text-blue-500">World of AI </span>
        Driven <span className="text-blue-400">Financial </span>
        <span className="text-blue-500">Solutions</span>
      </h1>
      <p className="text-sm md:text-lg text-gray-300 mb-8">
        Our expertise and personalized support empower a seamless journey
        toward your financial goals.
      </p>

      {/* Buttons (If you still need them) */}
      <div className="flex gap-4">
        <Link
          to="/Login-Page"
          className="bg-white text-blue-800 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Log In →
        </Link>
        <Link
          to="/Signup-Page"
          className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Sign Up →
        </Link>
      </div>
    </div>
  </section>
</div>
  );
};

export default HeroSection;
