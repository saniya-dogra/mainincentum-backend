import React from 'react';
import { Link } from 'react-router-dom';

export default function Button() {
  return (
      <div className="border border-[#1DA1F2] flex justify-center max-w-full w-[50%] rounded-xl m-auto mt-5 bg-[#26cd88] shadow-md hover:bg-blue-600 transition cursor-pointer">
        <button className="text-lg font-medium px-6 py-2  text-white w-full">
          Submit Personal details
        </button>
      </div>
  );
}