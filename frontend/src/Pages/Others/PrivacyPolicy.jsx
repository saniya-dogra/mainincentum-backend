import React, { useEffect, useState, useRef } from "react";

const PrivacyPolicy = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const refs = {
    privacyPolicy: useRef(null),
    informationCollection: useRef(null),
    useOfInformation: useRef(null),
    dataSecurity: useRef(null),
    cookies: useRef(null),
    changes: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.8 }
    );

    Object.values(refs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(refs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="bg-gray-100 text-black min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-8 px-6">
        <div className="relative" id="privacyPolicy" ref={refs.privacyPolicy}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          {/* Animated Underline */}
          <span
            className={`absolute left-1/2 transform -translate-x-1/2 bottom-[-2px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
              visibleSections.privacyPolicy ? "w-full" : "w-0"
            }`}
          ></span>
        </div>
        <p className="text-lg md:text-2xl mt-2 text-black max-w-4xl">
          Welcome to <span className="text-blue-700 font-semibold">INCENTUM</span>, where financial innovation meets
          customer-centric excellence. Please read this Privacy Policy carefully to understand how we collect, use, and
          protect your information.
        </p>
      </section>

      {/* Privacy Policy Content */}
      <div className="bg-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Information Collection Section */}
          <div className="relative" id="informationCollection" ref={refs.informationCollection}>
            <div className="inline-block relative">
              <h2 className="text-blue-700 text-4xl font-bold">Information Collection</h2>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
                  visibleSections.informationCollection ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              We collect personal information such as your name, email address, phone number, and financial details when
              you use our services. This information is used to provide you with tailored financial solutions and improve
              your experience on our platform.
            </p>
          </div>

          {/* Use of Information Section */}
          <div className="relative" id="useOfInformation" ref={refs.useOfInformation}>
            <div className="inline-block relative">
              <h2 className="text-blue-700 text-4xl font-bold">Use of Information</h2>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
                  visibleSections.useOfInformation ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Your information is used to process your requests, provide customer support, and improve our services. We
              may also use your information to send you promotional offers and updates, but you can opt out at any time.
            </p>
          </div>

          {/* Data Security Section */}
          <div className="relative" id="dataSecurity" ref={refs.dataSecurity}>
            <div className="inline-block relative">
              <h2 className="text-blue-700 text-4xl font-bold">Data Security</h2>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
                  visibleSections.dataSecurity ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              We take the security of your data seriously. We use industry-standard encryption and security protocols to
              protect your information from unauthorized access, disclosure, or misuse.
            </p>
          </div>

          {/* Cookies Section */}
          <div className="relative" id="cookies" ref={refs.cookies}>
            <div className="inline-block relative">
              <h2 className="text-blue-700 text-4xl font-bold">Cookies</h2>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
                  visibleSections.cookies ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Our website uses cookies to enhance your browsing experience. Cookies help us understand how you interact
              with our site and allow us to provide personalized content and ads. You can manage your cookie preferences
              through your browser settings.
            </p>
          </div>

          {/* Changes to This Policy Section */}
          <div className="relative" id="changes" ref={refs.changes}>
            <div className="inline-block relative">
              <h2 className="text-blue-700 text-4xl font-bold">Changes to This Policy</h2>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
                  visibleSections.changes ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              We reserve the right to update or modify this Privacy Policy at any time without prior notice. Your
              continued use of the website after any changes constitutes your acceptance of the revised Privacy Policy.
            </p>
          </div>

          {/* Contact Us Section */}
          <div className="relative" id="contact" ref={refs.contact}>
            <div className="inline-block relative">
              <h2 className="text-blue-700 text-4xl font-bold">Contact Us</h2>
              {/* Animated Underline */}
              <span
                className={`absolute left-0 bottom-[-6px] h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-1000 ease-in-out ${
                  visibleSections.contact ? "w-full" : "w-0"
                }`}
              ></span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a
                href="mailto:support@incentum.loans"
                className="text-blue-500 hover:underline"
              >
                support@incentum.loans
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;