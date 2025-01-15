import React, { useState } from 'react';

const ContactJusto = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    whoAreYou: '',
    comment: '',
  });

  const [selectedLocation, setSelectedLocation] = useState("mumbai");

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };




  return (
    <>
    <div>
    <h1 className='text-6xl text-center font-bold pt-[100px] pb-8'>We’d Love To <span className='text-blue-800'>Hear</span> From You</h1>
    <div className="flex flex-col lg:flex-row gap-6 p-6 lg:container lg:mx-auto px-[160px]">
      <div className="flex-1 p-6 rounded-lg  border-l border-gray-300">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">INCENTUM</h2>

        {/* Head Office (Mumbai Section) */}
        <div
          className="mb-6 cursor-pointer p-4 hover:bg-gray-100 border-b border-gray-300"
          onClick={() => handleLocationChange("mumbai")}
        >
          <h3 className="text-xl text-blue-900 font-semibold mb-2">Mumbai</h3>
          <p>
            <strong>Address:</strong> 8th Floor, EL-Tara Building, Orchard Avenue, Hiranandani Garden, Powai, Mumbai - 400076.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:mumbai.admin@justo.co.in"
              className="text-blue-700 underline"
            >
              mumbai.admin@justo.co.in
            </a>
          </p>
        </div>

        {/* Regional Office (Delhi Section) */}
        <div
          className="cursor-pointer p-4 hover:bg-gray-100"
          onClick={() => handleLocationChange("delhi")}
        >
          <h3 className="text-xl text-blue-900 font-semibold mb-2">Delhi</h3>
          <p>
            <strong>Address:</strong> 110 and 111, Nyati Emporius, Pune-Bangalore Highway, Baner, Pune - 411045.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:pune.admin@justo.co.in"
              className="text-blue-700 underline"
            >
              pune.admin@justo.co.in
            </a>
          </p>
        </div>
      </div>

      <div className="flex-1">
        <iframe
          title={`${selectedLocation} Map`}
          src={
            selectedLocation === "mumbai"
              ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.866835105398!2d72.90579707601661!3d19.1187511840727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c72cc35ea79d%3A0x2f38c624e83b39a2!2sJusto%20RealFinTech%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1704237934843!5m2!1sen!2sin"
              : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2844685205067!2d77.2340199760193!3d28.644886065655375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d192ad56bc79d%3A0x9608987aa2e498b2!2sNyati%20Emporius!5e0!3m2!1sen!2sin!4v1704237989473!5m2!1sen!2sin"
          }
          className="w-full h-[400px] rounded-lg border-0 shadow-lg"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>


<div className="p-8 max-w-2xl mx-auto">
  <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Can We Help You?</h2>
  <p className="text-center text-gray-600 mb-8">
    Contact us today to discuss how we can fuel your continued impact on the real estate market.
  </p>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid lg:grid-cols-2 gap-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Type your name"
          required
          className="w-full px-6 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Id<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Type your email"
          required
          className="w-full px-6 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
        />
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
          Contact<span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <span className="flex items-center justify-center w-16 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-700">
            +91
          </span>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Type your number"
            required
            className="w-full px-6 py-4 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
          />
        </div>
      </div>

      <div>
        <label htmlFor="whoAreYou" className="block text-sm font-medium text-gray-700 mb-2">
          Who are you?<span className="text-red-500">*</span>
        </label>
        <select
          id="whoAreYou"
          name="whoAreYou"
          value={formData.whoAreYou}
          onChange={handleChange}
          required
          className="w-full px-6 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
        >
          <option value="">Please Select</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <div>
      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
        Comment
      </label>
      <textarea
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Your comments here"
        className="w-full px-6 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
      />
    </div>

    <button
      type="submit"
      className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition duration-200 ease-in-out"
    >
      Submit
    </button>
  </form>
</div>


    </div>
   </>
  );
};

export default ContactJusto;
