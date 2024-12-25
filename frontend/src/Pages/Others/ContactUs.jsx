import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <section className="min-h-screen bg-primary py-16 px-6 flex flex-col items-center">
      <h2 className="text-white text-4xl font-bold mb-8 animate-fade-in">Contact Us</h2>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-6xl animate-slide-up">
        <div className="bg-auButtomColor text-black p-8 md:w-1/3 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
          <div className="flex items-center gap-4 mb-4 animate-fade-in">
            <FaPhoneAlt className="text-lg" />
            <span>+123 456 7890</span>
          </div>
          <div className="flex items-center gap-4 mb-4 animate-fade-in">
            <FaEnvelope className="text-lg" />
            <span>services@incentum.loans</span>
          </div>
          <div className="flex items-center gap-4 animate-fade-in">
            <FaMapMarkerAlt className="text-lg" />
            <span>Pune, Maharastra </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-8 md:w-2/3 flex flex-col animate-slide-up"
        >
          {submitted ? (
            <div className="text-green-500 text-lg font-semibold">
              Thank you for reaching out! We'll get back to you soon.
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-auButtomColor focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-auButtomColor focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-auButtomColor focus:outline-none transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-300 text-black font-semibold py-2 px-6 rounded-lg hover:bg-blue-200 transition-all duration-300"
              >
                Send Message
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
