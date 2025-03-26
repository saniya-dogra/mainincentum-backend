import React, { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { BsSpeedometer2 } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineDataExploration } from "react-icons/md";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

function HomeAccorrdion({ type, openAccordion, handleAccordionClick }) {
    const sections = {
        eligibility: [
            {
                heading: "Credit Score",
                content: "A score of 700 or higher increases approval chances, but customized options are available for lower scores with additional documentation or guarantors.",
                icon: <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Income Stability",
                content: "Salaried applicants should have a consistent income for at least 2 years, while self-employed individuals are assessed on 3 years of stable business performance.",
                icon: <IoDocumentTextOutline className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Age",
                content: "Applicants aged between 21 and 60 (65 for self-employed) at loan maturity are eligible. Loan tenure up to 80 years are offered by certain lenders.",
                icon: <IoMdContacts className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Repayment Capacity",
                content: "Calculated through Fixed Obligations to income ratio to ensure affordability.",
                icon: <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Loan-to-Value (LTV)",
                content: "Valuation of property in comparison to the loan amount as per RBI guidelines is one of the deciding factors for fixing loan amount.",
                icon: <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Property Type",
                content: "Loans are extended for residential apartments, villas, self-constructed houses, and approved builder projects.",
                icon: <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
        ],
        documents: [
            {
                heading: "KYC Documents",
                content: "Proof of Identity: PAN, Aadhaar, Voter ID, Passport, Proof of Address: Utility bill, Aadhaar, or rent agreement etc",
                icon: <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Income Proof",
                content: " Self-Employed: ITR for the last 3 years, audited financials, and business bank statements etc. Salaried: Latest 3 months' salary slips, Last 2-year Form 16, and 6-12 months’ bank statements.",
                icon: <IoDocumentTextOutline className="w-8 lg:w-8 h-7 lg:h-8" />,
            },
            {
                heading: "Liability Statements",
                content: "Existing loan details (if any).",
                icon: <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Property Documents:",
                content: "Sale agreement, builder’s demand letter, or allotment letter etc. Approved building plan or encumbrance certificate (EC) etc. No Objection Certificate (NOC) from project financing institution.",
                icon: <IoMdContacts className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Other Supporting Documents",
                content: "Loan account statements (if refinancing or taking a balance transfer). No Objection Certificate (NOC) from the builder or society.",
                icon: <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>,
            },
            
        ],
        apply:[
            {
                heading: "Consultation",
                content: "Share your requirements and financial details for tailored advice.",
                icon: (
                    <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Shortlisting Offers",
                content: "Our AI-driven tools curate the best offers from leading banks and NBFCs based on your eligibility and preferences.",
                icon: (
                  <IoDocumentTextOutline className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Document Submission",
                content: "Upload or submit your documents to expedite the approval process. Our AI tools evaluate your application, expediting approvals by up to 70% faster than traditional processes.",
                icon: (
                  <IoMdContacts className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "Approval and Verification",
                content: "Our experts coordinate with lenders to ensure your application is approved swiftly.",
                icon: (
                  <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />
    
                ),
            },
            {
                heading: "Loan Sanction",
                content: " Review the terms, sign the agreement, and get your loan sanctioned.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "Disbursement",
                content: "Funds are disbursed directly to the seller or builder, ensuring a secure and transparent transaction.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
        ],
        offer:[
            {
                heading: "Customized Incentives",
                content: "Benefit from exclusive rebates and incentives, directly enhancing your savings. We offer up to 100% of Bank charges as incentives (Cash back).",
                icon: (
                    <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "High Loan-to-Value (LTV)",
                content: "Get up to 90% financing of the property value for ready-to-move homes, with 80% for higher-value properties.",
                icon: (  
                <IoDocumentTextOutline className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "High Loan amount",
                content: "Incentum offers highest FOIR upto 95% to its customers and upto 100% of net salary of your spouse. You get the highest loan amount against your salary.",
                icon: (
                  <IoMdContacts className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Highest Moratorium",
                content: "Option to choose moratorium period up to 48 months",
                icon: (
                  <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />
    
                ),
            },
            {
                heading: "No EMI till possession",
                content: "Youngsters can make the most out of it by choosing deferment of EMI and/or interest servicing till possession of the house",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "Flexible Tenures",
                content: "Repayment terms range up to 30 years, allowing you to plan your EMIs conveniently.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "Competitive Interest Rates",
                content: "Choose between fixed rates (providing stability) and floating rates (linked to external benchmarks like the Repo Rate) starting at 8.35% per annum.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "Tax Benefits",
                content: "Enjoy tax deductions up to ₹1.5 lakh under Section 80C for principal repayment and ₹2 lakh under Section 24(b) for interest paid annually.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },{
                heading: "Quick Approvals",
                content: "Applications are processed within 3-7 business days, with a commitment to efficiency.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },{
                heading: "Prepayment and Foreclosure Options",
                content: "Reduce your financial burden with minimal or zero prepayment penalties as per lender policies.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },{
                heading: "Customised loan schemes",
                content: "Loan terms and conditions customisation available",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
        ],
    };

    const titles = {
        eligibility: "Eligibility Criteria: Tailored to Your Financial Profile",
        documents: "Comprehensive Document ",
        apply:"Your Application Journey, Simplified",
        offer:"Key Features of Our Home Loan Solutions",
    };

    const descriptions = {
        eligibility: [
            "As every financial journey is unique, ",
            "Here’s what we consider to ensure the perfect fit for your home loan",
        ],
        documents: [
            "Ensuring a swift and hassle-free process starts with proper documentation,",
            " Here’s what you’ll need",
        ],
        apply:[
            "At INCENTUM, we redefine convenience in home loan processing. Follow these straightforward steps"
        ],
        offer:[
            " "
        ]
    };

    const images = {
        eligibility: "/homeloanimg/eligibility.png",
        documents: "/commonloanimg/documentrequired.png",
        apply:"/homeloanimg/apply.png",
        offer:"/commonloanimg/offer.png"
    };


    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true, 
        });
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 mt-2" id={type}>
            <div
                className="mt-[10px] lg:mt-[25px] mx-6 lg:ml-[120px]"
                data-aos="fade-right"
            >
                <h1 className="text-[35px] md:ml-[10px] lg:text-[45px] font-bold heading">
                    {titles[type]}
                </h1>
                <p className="text-[18px] md:ml-[10px] lg:text-[18px] text-white font-medium leading-[30px] lg:leading-[35px]">
                    {descriptions[type][0]}
                </p>
                <p className="text-[18px] md:ml-[10px] text-white lg:text-[18px] font-medium leading-[28px] lg:leading-[25px]">
                    {descriptions[type][1]}
                </p>
                <div className="mt-6 lg:mt-8 max-w-full lg:w-[80%] md:w-[80%] w-full">
                    {sections[type].map((section, index) => {
                        const accordionKey = `${type}-${index + 1}`;
                        return (
                            <Accordion
                                key={accordionKey}
                                open={openAccordion === accordionKey}
                                className={`rounded-xl mb-4 pb-2 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] ${
                                    openAccordion === accordionKey
                                        ? "border-b-[4px] border-auButtomColor"
                                        : "border-b-[4px] border-white"
                                } bg-auColor relative`}
                            >
                                <AccordionHeader
                                    onClick={() => handleAccordionClick(accordionKey)}
                                    className="px-6 pt-4 pb-2 font-medium cursor-pointer text-white flex justify-start items-center border-none"
                                >
                                    <div>{section.icon}</div>
                                    <h2 className="ml-4 lg:ml-5 text-[19px] md:text-[20px] font-bold">
                                        {section.heading}
                                    </h2>
                                </AccordionHeader>
                                <div
                                    style={{
                                        maxHeight: openAccordion === accordionKey ? "500px" : "0",
                                        overflow: "hidden",
                                        transition: "max-height 0.5s ease-in-out",
                                    }}
                                >
                                    <AccordionBody className="px-6 lg:px-16 pb-4 lg:pb-2 text-white text-md sm:text-lg lg:text-[17px]">
                                        {section.content}
                                    </AccordionBody>
                                </div>
                            </Accordion>
                        );
                    })}
                </div>
            </div>
            <div
                className="flex justify-center lg:justify-start"
                data-aos="fade-left"
            >
                <img
                    src={images[type]}
                    alt={`${titles[type]} Illustration`}
                    className="mt-[30px] lg:mt-[160px] lg:ml-[90px] w-[370px] h-[320px] md:w-[480px] md:h-[380px] imgBorder my-4 rounded-lg  hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out"
                />
            </div>
        </div>
    );
    
}


export default function App() { 
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleAccordionClick = (key) => {
        setOpenAccordion(openAccordion === key ? null : key);
    };

    return (
        <div>
            <HomeAccorrdion type="eligibility" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
            <HomeAccorrdion type="documents" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
            <HomeAccorrdion type="apply" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
            <HomeAccorrdion type="offer" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
        </div>
    );
}
