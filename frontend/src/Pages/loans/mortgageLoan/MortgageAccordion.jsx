import React, { useState, useEffect } from "react";
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
import "aos/dist/aos.css";
import AOS from "aos";

function MortgageAccordion({ type, openAccordion, handleAccordionClick }) {
    const sections = {
        eligibility: [
            {
                heading: "Credit Score",
                content: "700+ preferred. Some lenders may accept lesser scores.",
                icon: <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Income Details",
                content: "Stable income from employment, business, or other sources.",
                icon: <IoDocumentTextOutline className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Property Type",
                content: "Below 40% for better approval chances.",
                icon: <IoMdContacts className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Age",
                content: "21-60 years (salaried); up to 65 years (self-employed).",
                icon: <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
        ],
        documents: [
            {
                heading: "Proof Of Identity",
                content: "Government-issued identification like a passport, driver's license, or national ID.",
                icon: <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Proof Of Address",
                content: "Documents like utility bills, rent agreements, or property tax receipts.",
                icon: <IoDocumentTextOutline className="w-8 lg:w-8 h-7 lg:h-8" />,
            },
            {
                heading: "Proof Of Income",
                content: "3-month salary slips, 2-year Form 16, Appointment letter/ Experience certificate, 2 Year IT returns, Computation, Balance sheets etc",
                icon: <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />,
            },
            {
                heading: "Bank statements ",
                content: "Last 3-6 months/Passbook of previous 6 months",
                icon: <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>,
            },
            {
                heading: "Property Documents ",
                content: "Title deed, sale agreement, and NOC from the builder or society etc.",
                icon: <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>,
            },
        ],
        apply:[
            {
                heading: "Loan Amount",
                content: "Generally up to 50-60% of the property’s market value/Distressed value depending on Residential or commercial nature of property",
                icon: (
                    <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Repayment Tenure",
                content: "5-20 YEARS, offering long-term affordability",
                icon: (
                  <IoDocumentTextOutline className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            
            {
                heading: "Processing Fees",
                content: "Up to 2.5% of the loan amount. May differ according to lenders",
                icon: (
                  <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />
    
                ),
            },
            {
                heading: "Pre-Payment Conditions",
                content: "Allowed, though some lenders may charge nominal fees",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "Other Charges",
                content: "Includes processing fee, stamp duty, documentation fees etc., and GST as applicable.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
        ],
        offer:[
            {
                heading: "Quick Response",
                content: "Incentum shall reach you within 20 minutes",
                icon: (
                    <BsSpeedometer2 className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Expert Guidance",
                content: ": From eligibility checks to document submissions, our experts handle every detail",
                icon: (
                  <IoDocumentTextOutline className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Customized Incentives",
                content: "Benefit from exclusive rebates and incentives, directly enhancing your savings.",
                icon: (
                  <IoMdContacts className="w-7 h-6 lg:w-6  lg:h-6" />
                ),
            },
            {
                heading: "Transparency First",
                content: "No hidden charges—our advice is professional and trustworthy.",
                icon: (
                  <TbListDetails className="w-7 h-6 lg:w-6  lg:h-6" />
    
                ),
            },
            {
                heading: "Tech-Driven Solutions",
                content: "Leverage AI to match you with the best lender, saving up to 70% of the usual processing time.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
            {
                heading: "End-to-End Support: ",
                content: "From document collection to repayment planning, we’re with you every step of the way, ensuring stress-free disbursal.",
                icon: (
                  <MdOutlineDataExploration className="w-7 h-6 lg:w-6  lg:h-6"/>
                ),
            },
        ],
    };

    const titles = {
        eligibility: "Eligibility Criteria",
        documents: "Documents Required",
        apply:"Loan Details and Charges",
        offer:"Loan-to-Value Ratio (LTV)",
    };

    const descriptions = {
        eligibility: [
            "Am I Eligible? Let's Find Out Together!",
            "We believe in making dreams come true, but let's make sure we're ready for the loan.",
        ],
        documents: [
            "Documents You'll Need for Your Loan",
            "To make your property loan process quick and easy, make sure you have the following.",
        ],
        apply:[
            "Getting your property loan should be stress-free."
        ],
        offer:[
            " LTV defines the percentage of the property’s value that the lender is willing to finance"
        ]
    };

    const images = {
        eligibility: "/personalloanimg/Eligibility.webp",
        documents: "/commonloanimg/documentrequired.png",
        apply:"/personalloanimg/apply.webp",
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
                <div className="mt-[10px] lg:mt-[25px] mx-6 lg:ml-[120px]" data-aos="fade-right">
                    <h1 className="text-[35px] md:ml-[10px] lg:text-[45px] font-bold heading">{titles[type]}</h1>
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
                                    className={`rounded-xl mb-6 pb-2 transition-all duration-500 ease-in-out hover:scale-[1.03] hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] ${openAccordion === accordionKey
                                        ? "border-b-[4px] border-auButtomColor"
                                        : "border-b-[4px] border-white"
                                    } bg-auColor`}
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
                <div className="flex justify-center lg:justify-start" data-aos="fade-left">
                    <img
                        src={images[type]}
                        alt={`${titles[type]} Illustration`}
                        className="mt-[30px] lg:mt-[160px] lg:ml-[90px] w-[370px] h-[320px] md:w-[480px] md:h-[380px] imgBorder my-4 rounded-lg hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out"
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
            <MortgageAccordion type="eligibility" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
            <MortgageAccordion type="documents" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
            <MortgageAccordion type="apply" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
            <MortgageAccordion type="offer" openAccordion={openAccordion} handleAccordionClick={handleAccordionClick} />
        </div>
    );
}
