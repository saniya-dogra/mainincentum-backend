import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What are the eligibility criteria for a loan?",
      answer: "To be eligible for a loan, you need a credit score of 700 or higher, stable income for at least 2 years (salaried) or 3 years (self-employed), age between 21 and 60 (65 for self-employed) at loan maturity, and a good repayment capacity.",
    },
    {
      id: 2,
      question: "What documents are required to apply for a loan?",
      answer: "You need KYC documents (PAN, Aadhaar, Voter ID, Passport, proof of address), income proof, and other supporting documents.",
    },
    {
      id: 3,
      question: "How does the loan application process work?",
      answer: "The process involves consultation, offer shortlisting, document submission, approval, loan sanction, and disbursement, all streamlined for quick and hassle-free processing.",
    },
    {
      id: 4,
      question: "What are the key features and benefits of your loan solutions?",
      answer: "Our loan solutions offer customized incentives, high loan-to-value, flexible tenures, competitive interest rates, tax benefits, quick approvals.",
    },
    {
      id: 5,
      question: "What is the maximum loan amount I can get?",
      answer: "The maximum loan amount depends on your income, repayment capacity, and CIBIL Score.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-[#010080] to-[#0A1536] py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-10 sm:mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`border rounded-lg transition-colors ${
                activeIndex === index
                  ? "bg-[#010080] border-blue-500"
                  : "border-[#323232]"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 text-left text-white font-medium focus:outline-none"
              >
                {faq.question}
                <span
                  className={`transition-transform ${
                    activeIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  {activeIndex === index ? "+" : "+"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 text-sm text-gray-200">
                  {faq.answer || "Answer content goes here."}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
