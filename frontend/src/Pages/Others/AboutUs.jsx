import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-black min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-2xl text-black max-w-4xl">
          Welcome to <span className="text-blue-500 font-semibold">INCENTUM</span>, where financial innovation meets customer-centric excellence. 
          We are more than a financial consultancy—we are your trusted partner in navigating the intricate world of loans, investments, and property acquisitions.        </p>
      </section>

      {/* Background and Vision */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Background Section */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-blue-800 text-3xl font-bold">Background</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              At INCENTUM, we believe that securing financial solutions should
              be straightforward, transparent, and rewarding. As pioneers in
              customer incentivization, we blend cutting-edge technology with
              expert consultancy to offer tailored financial products that
              align with your unique needs.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/about-background.svg"
              alt="Background Illustration"
              className="w-3/4 max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Vision Section */}
          <div className="flex justify-center">
            <img
              src="/vision-back.svg"
              alt="Vision Illustration"
              className="w-3/4 max-w-md rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <h2 className="text-blue-800 text-3xl font-bold">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our vision is to revolutionize financial accessibility through a
              dynamic digital platform that bridges customers and financial
              institutions. By offering a tech-driven, user-friendly ecosystem,
              we empower individuals to make informed decisions effortlessly
              while connecting them to the right financial solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission, Ambition, and AI Section */}
      <div className="bg-[#f8fbff] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Defining Our Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/hand-heart.png"
                    alt="AI Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our AI</h3>
              <p className="text-gray-600">
                Our AI-enabled platform ensures the best match between
                customers and financial institutions, minimizing complexity.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/goal.png"
                    alt="Mission Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600">
                As torchbearers of innovation, we set benchmarks in service
                quality, ensuring customer delight and trust.
              </p>
            </div>

            {/* Ambition Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/star.png"
                    alt="Ambition Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Our Ambition
              </h3>
              <p className="text-gray-600">
                Cashbacks, bonuses, and rewards for choosing INCENTUM. We
                believe in sharing your financial burden at the times you need
                the most.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Philosophy Section */}
      <div className="py-12 px-6">
        <h2 className="text-center text-3xl font-semibold mb-12">
          Core Philosophy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Advice Section */}
          <div className="group relative flex flex-col items-center text-center overflow-hidden">
            <img
              src="/advicee.webp"
              alt="Advice"
              className="rounded-md shadow-md w-full transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-500 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-bold">Advice</h3>
            </div>
          </div>

          {/* Create Section */}
          <div className="group relative flex flex-col items-center text-center overflow-hidden">
            <img
              src="/create.webp"
              alt="Create"
              className="rounded-md shadow-md w-full transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-500 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-bold">Create</h3>
            </div>
          </div>

          {/* Nurture Section */}
          <div className="group relative flex flex-col items-center text-center overflow-hidden">
            <img
              src="/nuture.webp"
              alt="Nurture"
              className="rounded-md shadow-md w-full transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-500 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-bold">Nurture</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-14 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
          <p className="text-black text-lg md:text-xl mt-4">
            Here are a few reasons why millions trust{" "}
            <span className="text-blue-600 font-semibold">INCENTUM</span>.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">
              Innovative Technology
            </h3>
            <p className="text-black mt-2">
              Cutting-edge tools to simplify your banking experience.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">
              Transparent Processes
            </h3>
            <p className="text-black mt-2">
              Full visibility into every transaction and process.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">
              Quick Approvals
            </h3>
            <p className="text-black mt-2">Apply and get approved in no time.</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">24/7 Support</h3>
            <p className="text-black mt-2">
              Our team is here to help you anytime, anywhere.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">
              Secure Solutions
            </h3>
            <p className="text-black mt-2">
              Your data and transactions are safe with us.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold">
              Customer First
            </h3>
            <p className="text-black mt-2">
              Your satisfaction is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          With India's young population driving the demand for homes, cars, and
          financial independence
        </h2>
        <p className="text-black text-lg md:text-xl mb-8">
          <span className="text-blue-300 font-semibold">INCENTUM</span> is here
          to make those dreams a reality. Experience the future of finance,
          where every decision is informed, rewarding, and hassle-free.
        </p>
        <button className="bg-blue-400 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
