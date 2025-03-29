import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import homeloan from '../../../assets/homeloan.webp';
import vehicleloan from '../../../assets/vehicleloan.webp';
import personalloan from '../../../assets/personalloan.webp';
import businessloan from '../../../assets/businessloan.webp';

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState("home-loan");
  const [activeIndex, setActiveIndex] = useState(1); // For carousel active slide

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
    setActiveTab(id);
  };

  // Carousel Logic
  const carouselImages = ["/slimage1.jpg", "/slimage2.jpg", "/slimage3.jpg", "/slimage2.jpg"];

  return (
    <>
      <div className="bg-white">
        {/* Header Navbar */}
        <div className="sticky top-0 z-10">
          <div className="container mx-auto flex justify-center py-2 pt-3 px-4 sm:px-0">
            <div className="flex bg-gradient-to-b from-[#e8f4fd] to-[#dfe1f6] shadow-md rounded-full px-2 py-1 space-x-2 sm:space-x-6 border border-[#14296d]">
              {[
                { id: "home-loan", label: "Home Loan" },
                { id: "car-loan", label: "Vehicle Loan" },
                { id: "personal-loan", label: "Personal Loan" },
                { id: "business-loan", label: "Business Loan" },
                { id: "mortgage-loan", label: "Mortgage Loan" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-0 sm:px-7 py-2 sm:py-3 rounded-3xl text-xs sm:text-xl font-semibold ${
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
        <div className="container mx-auto space-y-10">
          {/* Home Loan */}
          <div
            id="home-loan"
            className="flex flex-col md:flex-row items-center justify-center hover:bg-[#e5e5e5] transition-colors duration-200"
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
              <Link to="/home-loan" className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                HOME LOAN
              </Link>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Find Your Dream <span className="text-blue-700">Home</span> With Our
                <span className="text-blue-700"> Home Loan</span> Solution
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Owning a home should be a joyous experience, not a source of stress. We understand that purchasing a home is one of the most significant financial decisions you'll ever make. That's why we've developed advanced home loan solutions that give you access to competitive interest rate...
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
            className="flex flex-col md:flex-row items-center justify-center hover:bg-[#e5e5e5] transition-colors"
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
              <Link to="/vehicle-loan" className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                VEHICLE LOAN
              </Link>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Drive Your Dream <span className="text-blue-700">Car </span> with Our Tailored
                <span className="text-blue-700"> Vehicle Loan</span> Solution
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                The journey toward owning your dream car should be filled with something other than roadblocks. Our advanced vehicle loan options are designed to take you from application to approval quickly and effortlessly. Whether you're looking for a sleek sports car, a family-friendly SUV...
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
            className="flex flex-col md:flex-row items-center justify-center hover:bg-[#e5e5e5] transition-colors"
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
              <Link to="/personal-loan" className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                PERSONAL LOAN
              </Link>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Fuel Your <span className="text-blue-700">Personal Goals </span> With Our Flexible <span className="text-blue-700"> Personal Loan</span> Solution!
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Life is full of unexpected moments, and having access to quick, hassle-free funding can make all the difference. Whether you're renovating your home, covering medical expenses, or financing a personal project, our personal loan solutions are tailored to meet your individual needs...
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
            className="flex flex-col md:flex-row items-center justify-center hover:bg-[#e5e5e5] transition-colors"
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
              <Link to="/business-loan" className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                BUSINESS LOAN
              </Link>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Grow Your <span className="text-blue-700"> Business</span> With Our Custom
                <span className="text-blue-700"> Business Loan</span> Options!
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Running a successful business requires careful planning and timely investments. Whether you're expanding your current operations or starting a brand-new venture, having access to reliable funding is essential. Our business loan options provide the financial support you need to grow sustainably,
              </p>
              <div className="mt-10">
                <Link
                  to="/business-loan"
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl border border-black hover:bg-yellow-300 transition"
                >
                  Know More →
                </Link>
              </div>
            </div>
          </div>

          {/* Mortgage Loan */}
         
          <div
            id="mortgage-loan"
            className="flex flex-col md:flex-row items-center justify-center hover:bg-[#e5e5e5] transition-colors"
          >
            <div className="p-4 md:w-1/2 flex justify-center">
              <Link to="/mortgage-loan">
                <img
                  src={businessloan}
                  alt="Business Loan Graph"
                  className="rounded-lg w-full max-w-md"
                />
              </Link>
            </div>
            <div className="p-4 md:w-2/3 text-center md:text-left">
              <Link to="/mortgage-loan" className="bg-blue-900 text-white text-sm sm:text-lg px-6 py-3 rounded-full inline-block">
                MORTGAGE LOAN
              </Link>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4">
                Grow Your <span className="text-blue-700"> Business</span> With Our Custom
                <span className="text-blue-700"> Mortgage Loan</span> Options!
              </h2>
              <p className="mt-4 text-sm sm:text-xl text-gray-600">
                Running a successful business requires careful planning and timely investments. Whether you're expanding your current operations or starting a brand-new venture, having access to reliable funding is essential. Our business loan options provide the financial support you need to grow sustainably,
              </p>
              <div className="mt-10">
                <Link
                  to="/mortgage-loan"
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-xl border border-black hover:bg-yellow-300 transition"
                >
                  Know More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Updated Carousel Section */}
      <div className="relative w-full max-w-[900px] mx-auto mt-8">
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
          slidesPerView={3}
          centeredSlides={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className={`flex items-center justify-center transition-all duration-500 ${
                  activeIndex === index ? "scale-110 shadow-2xl" : "opacity-95 scale-90"
                }`}
              >
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default FeaturesSection;