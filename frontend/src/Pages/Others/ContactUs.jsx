import React, { useState, useEffect, useRef } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    whoAreYou: "",
    comment: "",
  });

  const [selectedLocation, setSelectedLocation] = useState("pune");
  const [visibleSections, setVisibleSections] = useState({});
  const headerRef = useRef(null);
  const helpRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.8 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (helpRef.current) observer.observe(helpRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (helpRef.current) observer.unobserve(helpRef.current);
    };
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div>
      {/* Animated Header */}
      <div className="relative flex justify-center" id="header" ref={headerRef}>
  <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold p-5 relative">
    Connect <span className="text-blue-800">with</span> Incentum
    <span
      className={`absolute left-1/2 transform -translate-x-1/2 bottom-[-1px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
        visibleSections.header ? "w-full" : "w-0"
      }`}
    ></span>
  </h1>
</div>

{/* Location and Map Section */}
<div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:container lg:mx-auto lg:px-[160px]">
  {/* Location Info */}
  <div className="flex-1 p-4 sm:p-6 rounded-lg border-l border-gray-300">
    <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">INCENTUM</h2>

      {/* Pune Office */}
    <div
      className="cursor-pointer p-4 hover:bg-gray-100"
      onClick={() => handleLocationChange("pune")}
    >
      <h3 className="text-lg sm:text-xl text-blue-900 font-semibold mb-2">Pune</h3>
      <p>
        <strong>Address:</strong> PC Soft Building,
        3rd floor, Bhandarkar Road, Pune - 411004.
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:services@incentum.loans"
          className="text-blue-700 underline"
        >
          services@incentum.loans
        </a>
      </p>
    </div>
    
    {/* Jaipur Office */}
    <div
      className="mb-6 cursor-pointer p-4 hover:bg-gray-100 border-b border-gray-300"
      onClick={() => handleLocationChange("Jaipur")}
    >
      <h3 className="text-lg sm:text-xl text-blue-900 font-semibold mb-2">Jaipur</h3>
      <p>
        <strong>Address:</strong> 28, Shiv Gorax Nagar, Modal Town, Jagatpura,
        Malviya Nagar, Jaipur - 302017.
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:service@incentum.loans"
          className="text-blue-700 underline"
        >
          service@incentum.loans
        </a>
      </p>
    </div>
  </div>

  {/* Map Section */}
  <div className="flex-1">
    <iframe
      title={`${selectedLocation} Map`}
      src={
        selectedLocation === "pune"
          ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.0972829839661!2d73.83847163412351!3d18.517212896202473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8f3fffffff%3A0xf99c9c2170f9787e!2sPCSoft%20ERP%20Solutions%20%7CBest%20ERP%20Software%20provider%20in%20pune!5e0!3m2!1sen!2sin!4v1738949831063!5m2!1sen!2sin"
          : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.9798072632957!2d75.82163387881555!3d26.84059455310514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db619daa1134b%3A0x9574fe7d14aa2a5d!2sShiv%20Goraksh%20Nagar%2C%20Model%20Town%2C%20Jagatpura%2C%20Jaipur%2C%20Rajasthan%20302017!5e0!3m2!1sen!2sin!4v1738949997531!5m2!1sen!2sin"
      }
      className="w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-lg border-0 shadow-lg"
      loading="lazy"
      allowFullScreen
    ></iframe>
  </div>
</div>


      {/* Contact Form Section */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto relative" ref={helpRef} id="help">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-blue-900 mb-6 relative">
    Can We Help You?
    <span
      className={`absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
        visibleSections.help ? "w-full" : "w-0"
      }`}
    ></span>
  </h2>
  <p className="text-center text-gray-600 mb-6 sm:mb-8">
    Contact us today to discuss how we can fuel your continued impact on real estate market.
  </p>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Full Name and Email */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
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
          className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
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
          className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
        />
      </div>
    </div>

    {/* Contact and Dropdown */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Contact<span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <span className="flex items-center justify-center w-14 sm:w-16 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-700">
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
            className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="loantype"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Loan type?<span className="text-red-500">*</span>
        </label>
        <select
          id="loantype"
          name="loantype"
          value={formData.loantype}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
        >
          <option value="">Please Select</option>
          <option value="buyer">Home Loan</option>
          <option value="seller">Vehicle Loan</option>
          <option value="seller">Personal Loan</option>
          <option value="seller">Business Loan</option>
          <option value="seller">Mortgage Loan</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    {/* Comment Section */}
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Comment
      </label>
      <textarea
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Your comments here"
        className="w-full px-4 py-3 sm:px-6 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm transition duration-200 ease-in-out"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition duration-200 ease-in-out"
    >
      Submit
    </button>
  </form>
</div>

 </div>
  );
};

export default ContactUs;
