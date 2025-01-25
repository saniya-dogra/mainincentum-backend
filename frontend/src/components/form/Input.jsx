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
        className="w-full border text-black border-blue-400 bg-[#D3EEFF] text-[16px] py-[11px] pl-6 rounded-xl mb-4 placeholder-gray-40 shadow-md font-base text-start focus:outline-none hover:bg-blue-200 transition-all duration-300"
      />
    </div>
  );
}
