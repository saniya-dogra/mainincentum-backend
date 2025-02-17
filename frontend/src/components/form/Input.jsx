import React from "react";

export default function Input({ placeholder, name, value, onChange }) {
  return (
    <div>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#1a1c5d] bg-[#010449] text-white text-[16px] py-[12px] pl-6 rounded-xl mb-4 placeholder-white placeholder-opacity-60 shadow-md font-medium focus:outline-none hover:border-[#5793A4] focus:ring-2 focus:ring-[#48A6A7] transition-all duration-300"
      />
    </div>
  );
}