import React from 'react';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
    <div className="flex flex-wrap gap-4 lg:gap-8 mt-4 my-2 lg:my-6">
      <Link to={'/form-detail-one'}>
        <button
          className="flex text-black text-lg sm:text-xl border-[2px] sm:border-[3px] border-blue-800 hover:bg-yellow-300 hover:border-yellow-300 hover:scale-105 hover:shadow-lg transform transition-all duration-300 px-4 sm:px-2 py-2 sm:py-1 rounded-xl items-center">
          Apply with Co-applicant
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-5 sm:h-5 pl-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </Link>
      <Link to={'/form-detail-one'}>
        <button
          className="flex text-white text-lg sm:text-xl border-[2px] sm:border-[3px] bg-primary border-primary hover:bg-blue-800 hover:border-blue-800 hover:scale-105 hover:shadow-lg transform transition-all duration-300 px-4 sm:px-2 py-2 sm:py-1 rounded-xl items-center">
          Apply as Individual
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-5 sm:h-5 pl-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
