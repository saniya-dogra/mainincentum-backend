import React from 'react';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
      <div className="border border-[#1DA1F2] flex justify-center max-w-full w-[12%] rounded-xl m-auto mt-5 bg-blue-500 shadow-md hover:bg-blue-600 transition cursor-pointer">
        <button className="text-lg font-medium px-6 py-2  text-white w-full">
          Next
        </button>
      </div>
  );
}