import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-black min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-6">
      <div className="relative group">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
        <span
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2px] w-0 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-500 ease-in-out"
        ></span>
      </div>
        <p className="text-lg md:text-2xl mt-2 text-black max-w-4xl">
          Welcome to <span className="text-blue-700 font-semibold">INCENTUM</span>, where financial innovation meets customer-centric excellence. 
          We are more than a financial consultancy—we are your trusted partner in navigating the intricate world of loans, investments, and property acquisitions.        </p>
      </section>

 {/* Background and Vision */}
<div className="bg-gray-100 py-16 px-6">
  {/* Background Section */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Content on Left */}
    <div className="flex flex-col space-y-6 order-2 md:order-1">
      <div className="group relative">
        <h2 className="text-blue-700 text-4xl font-bold">
          Background
          <span
            className="absolute left-0 bottom-[-6px] w-0 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-500 ease-in-out"
          ></span>
        </h2>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed">
        At INCENTUM, we believe that securing financial solutions should
        be straightforward, transparent, and rewarding. As pioneers in
        customer incentivization, we blend cutting-edge technology with
        expert consultancy to offer tailored financial products that
        align with your unique needs.
      </p>
    </div>
    {/* Image on Right */}
    <div className="flex justify-center order-1 md:order-2">
      <img
        src="/about-background.svg"
        alt="Background Illustration"
        className="w-3/4 max-w-md rounded-lg shadow-lg"
      />
    </div>
  </div>

  {/* Vision Section */}
  <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Image on Left */}
    <div className="flex justify-center order-1 md:order-1">
      <img
        src="/vision-back.svg"
        alt="Vision Illustration"
        className="w-3/4 max-w-md rounded-lg shadow-lg"
      />
    </div>
    {/* Content on Right */}
    <div className="flex flex-col space-y-6 order-2 md:order-2">
      <div className="group relative">
        <h2 className="text-blue-700 text-4xl font-bold">
          Our Vision
          <span
            className="absolute left-0 bottom-[-6px] w-0 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-500 ease-in-out"
          ></span>
        </h2>
      </div>
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
    <div className="relative group flex justify-center">
      <h2 className="text-5xl font-bold text-center text-blue-700 mb-12 relative">
        Defining Our Journey
        <span
          className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-500 ease-in-out"
        ></span>
      </h2>
    </div>



          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/?size=100&id=62903&format=png&color=FFFFFF"
                    alt="AI Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Our AI</h3>
              <p className="text-gray-600">
                Our AI-enabled platform ensures the best match between
                customers and financial institutions, minimizing complexity.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
              <div className="flex justify-center items-center mb-4">
                <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/goal.png"
                    alt="Mission Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
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
                <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/star.png"
                    alt="Ambition Icon"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
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
      <div className="relative group flex justify-center">
        <h2 className="text-center text-5xl text-blue-700 font-bold mb-12 relative">
          Core Philosophy
          <span
            className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-0 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-500 ease-in-out"
          ></span>
        </h2>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Advice Section */}
          <div className="group relative flex flex-col items-center text-center overflow-hidden">
            <img
              src="/advicee.webp"
              alt="Advice"
              className="rounded-md shadow-md w-full transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white p-8 text-lg font-bold">We are redefining the financial landscape by giving you control over your choices. We offer the best for you</h3>
            </div>
          </div>

          {/* Create Section */}
          <div className="group relative flex flex-col items-center text-center overflow-hidden">
            <img
              src="/create.webp"
              alt="Create"
              className="rounded-md shadow-md w-full transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg p-8 font-bold">Innovation is at the heart of everything we do. We craft exceptional real estate products that stand out in the market. By combining creativity with data-driven insights, we develop properties that not only meet but exceed the expectations of today’s discerning buyers. Our goal is to create appreciating assets that generate substantial wealth for our clients.</h3>
            </div>
          </div>

          {/* Nurture Section */}
          <div className="group relative flex flex-col items-center text-center overflow-hidden">
            <img
              src="/nuture.webp"
              alt="Nurture"
              className="rounded-md shadow-md w-full transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-700 bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg p-8 font-bold">We are here to change the way you loan. We aim to bring the lenders to you. We take pride in acting as financial matchmakers, fostering mutual success for all stakeholders.  
             Whether you're a customer looking for the best financial product, a bank seeking quality leads, or a builder aiming to enhance property sales, INCENTUM is your partner in growth.
             </h3>
            </div>
          </div>
        </div>
      </div>

        {/* Why Choose Us Section */}
        <section className="py-14 px-6 bg-gray-50">
  <div className="text-center mb-12 relative group">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 inline-block relative">
      Why Choose Us?
      <span
        className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-0 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full group-hover:w-full transition-all duration-500 ease-in-out"
      ></span>
    </h2>
    <p className="text-gray-600 text-lg md:text-xl mt-4 max-w-3xl mx-auto">
      Millions trust <span className="text-blue-700 font-semibold">INCENTUM</span> for these reasons. Experience the difference today.
    </p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
    {/* Card 1 */}
    <div className=" shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src="/innovative.jpg"
        alt="Innovative Technology Icon"
        className=" rounded-lg  mb-4"
      />
      <h3 className="text-2xl font-semibold text-blue-700 ">Innovative Technology</h3>
      <p className=" mt-2">
        Cutting-edge tools to simplify your banking experience.
      </p>
    </div>

    {/* Card 2 */}
    <div className=" shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src="/abstract.jpg"
        alt="Transparent Processes Icon"
        className=" rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-blue-700 ">Transparent Processes</h3>
      <p className=" mt-2">
        Full visibility into every transaction and process.
      </p>
    </div>

    {/* Card 3 */}
    <div className=" shadow-lg rounded-lg p-9 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src="/Quick_Approvals.jpg"
        alt="Quick Approvals Icon"
        className=" rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-blue-700">Quick Approvals</h3>
      <p className=" mt-2">Apply and get approved in no time.</p>
    </div>

    {/* Card 4 */}
    <div className=" shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src="/call.jpg"
        alt="24/7 Support Icon"
        className="rounded-lg mb-4"
      />
      <h3 className="text-2xl  font-semibold text-blue-700">24/7 Support</h3>
      <p className=" mt-2">
        Our team is here to help you anytime, anywhere.
      </p>
    </div>

    {/* Card 5 */}
    <div className=" shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src="/safe.jpg"
        alt="Secure Solutions Icon"
        className="rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-blue-700">Secure Solutions</h3>
      <p className=" mt-2">
        Your data and transactions are safe with us.
      </p>
    </div>

    {/* Card 6 */}
    <div className=" shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src="/office.jpg"
        alt="Customer First Icon"
        className="rounded-lg mb-4"
      />
      <h3 className="text-2xl font-semibold text-blue-700">Customer First</h3>
      <p className=" mt-2">
        Your satisfaction is our priority.
      </p>
    </div>
  </div>
</section>


      {/* Call to Action */}
      <section className="py-14 px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          With India's young population driving the demand for <br />
           homes, cars, and financial independence
        </h2>
        <p className="text-black text-lg md:text-xl mb-8">
          <span className="text-blue-700 font-semibold">INCENTUM</span> is here
          to make those dreams a reality. Experience the future of finance, <br />
          where every decision is informed, rewarding, and hassle-free.
        </p>
        <button className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
