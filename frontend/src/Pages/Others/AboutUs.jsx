import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-[#0a1a2a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-4xl">
          Welcome to <span className="text-blue-300 font-semibold">INCENTUM</span>, where modern technology meets seamless financial solutions. 
          We are dedicated to making banking faster, easier, and more transparent for everyone.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-14 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-blue-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is to revolutionize banking by leveraging technology to deliver personalized, efficient, and 
              secure financial solutions to every individual and business. We aim to simplify banking and put control 
              back in your hands.
            </p>
          </div>
          <div className="bg-blue-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-300">
              To become a global leader in innovative banking solutions, ensuring that every customer has access to 
              financial services that are swift, versatile, and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-14 px-6 bg-blue-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
          <p className="text-gray-300 text-lg md:text-xl mt-4">
            Here are a few reasons why millions trust <span className="text-blue-300 font-semibold">INCENTUM</span>.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">Innovative Technology</h3>
            <p className="text-gray-300 mt-2">
              Cutting-edge tools to simplify your banking experience.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">Transparent Processes</h3>
            <p className="text-gray-300 mt-2">
              Full visibility into every transaction and process.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">Quick Approvals</h3>
            <p className="text-gray-300 mt-2">
              Apply and get approved in no time.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">24/7 Support</h3>
            <p className="text-gray-300 mt-2">
              Our team is here to help you anytime, anywhere.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">Secure Solutions</h3>
            <p className="text-gray-300 mt-2">
              Your data and transactions are safe with us.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">Customer First</h3>
            <p className="text-gray-300 mt-2">
              Your satisfaction is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Experience Modern Banking?</h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Join <span className="text-blue-300 font-semibold">INCENTUM</span> today and transform your banking experience.
        </p>
        <button className="bg-blue-400 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
