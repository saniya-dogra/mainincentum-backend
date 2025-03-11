import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-[#010059] text-white py-8 px-6 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Section */}
        <div className="col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold">INCENTUM</h1>
          <p className="mt-4 text-sm md:text-base">
            INCENTUM is the best platform to buy, sell, and exchange multiple loans with ease.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 text-sm md:text-base text-black focus:outline-none rounded-lg w-full sm:w-auto"
            />
            <button className="bg-[#F5C13D] px-5 py-2 text-black text-sm md:text-base font-bold rounded-lg sm:ml-4 hover:bg-[#F5C13D] transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Center and Right Section */}
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company Section */}
          <div>
      <h3 className="text-lg md:text-xl font-bold uppercase">Company</h3>
      <ul className="mt-4 space-y-2 text-sm md:text-base">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-us">About</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact</Link>
        </li>
        <li>
          FAQs
        </li>
      </ul>
    </div>


          {/* Products Section */}
          <div>
        <h3 className="text-lg md:text-xl font-bold uppercase">Services</h3>
        <ul className="mt-4 space-y-2 text-sm md:text-base">
          <li>
            <Link to="/home-loan">Home Loan</Link>
          </li>
          <li>
            <Link to="/vehicle-loan">Vehicle Loan</Link>
          </li>
          <li>
            <Link to="/personal-loan">Personal Loan</Link>
          </li>
          <li>
            <Link to="/business-loan">Business Loan</Link>
          </li>
          <li>
            <Link to="/mortgage-loan">Mortgage Loan</Link>
          </li>
        </ul>
      </div>


          {/* user res */}
          <div>
            <h3 className="text-lg md:text-xl font-bold uppercase">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm md:text-base">
            <li>
            <Link to="/emi-calculator">Emi Calculator</Link>
          </li>
              <li>
                <Link to="/form-detail-one"> Apply for a loan</Link>
              </li>
              <li>Track application status</li>
              <li>
                <Link to="/contact-us"> Support</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg md:text-xl font-bold uppercase">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm md:text-base">
              <li>
             <Link to="/disclaimer"> Disclaimer</Link>
              </li>
              <li> 
              <Link to="/privacy-policy"> Privacy Policy </Link>
              </li>
              <li> 
              <Link to="/terms-of-service"> Terms of Service </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-400 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm md:text-base">
        <p className="text-center sm:text-left">Statutory legal information</p>
        <p className="text-center sm:text-right mt-4 sm:mt-0">
          2024-2025 Incentum | Site Map | <Link to="/privacy-policy"> Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
