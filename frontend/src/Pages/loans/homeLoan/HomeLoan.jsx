import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmiCalculator from "../../homePage/homecomponents/EmiCalculator";
import HomeAccorrdion from "./HomeAccorrdion";
import LoanNav from "../../../components/loanSec/LoanNav";
import Button from "../../../components/loanSec/Button";


export default function HomeLoan() {

  return (
    <>
  <div className=" scroll-smooth focus:scroll-auto"
>
     <div className="landingheader">
      <div className="  grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-0">
        <div className="mt-4 lg:mt-[35px] lg:ml-[120px]">
          <button className="mb-4 lg:mb-6">
            <Link className="bg-primary text-white text-sm sm:text-md px-4 py-3 md:px-5  md:py-3 hover:bg-blue-800 rounded-full font-medium">
             HOME LOAN
            </Link>
          </button>
          <h2 className="font-bold text-[26px] sm:text-[48px] lg:text-[50px] leading-[44px] sm:leading-[60px] lg:leading-[55px]">
          Step Into Your Dream Home with Confidence
          </h2>
          <div className="flex lg:hidden justify-center items-center mt-12 lg:mt-[310px]">
            <img
              src="/homeloanimg/homegif.gif"
              alt=""
              className="h-auto max-w-full w-[300px] sm:w-[500px] lg:w-[700px] lg:h-[500px]"
            />
          </div>
          <p className="text-md sm:text-lg lg:text-[14px] leading-[20px] sm:leading-[25px] lg:leading-[29px] text-gray-800 mt-4 lg:mt-3">
          Owning a home is one of life’s most significant milestones—a symbol of security, comfort, and achievement. At INCENTUM, we are committed to turning this aspiration into reality by providing seamless and expert-guided home loan solutions. Whether it’s a modern apartment, a luxurious villa, or your first independent house, our professional services and AI-driven insights ensure your journey to homeownership is smooth and rewarding.{" "}
          </p>
   
          <p className="text-md sm:text-lg lg:text-[14px]  leading-[20px] sm:leading-[25px] lg:leading-[29px] text-gray-800">
          We partner with leading financial institutions across India to bring you competitive interest rates, flexible repayment tenures, and expedited approvals. By handling the complexities of the home loan process, we empower you to focus on what truly matters—creating a haven for your loved ones.
          </p>
          <h2 className="text-xl  lg:text-[22px]  mt-4 lg:mt-6 lg:leading-7 ">
          And yes, our incentives add an extra reason to celebrate.
          </h2>
          <h2 className="text-xl lg:text-[20px] lg:leading-7 ">
          Take the first step today and transform
           your dream into an address!
          </h2>
          
          <Button/>
      
        
        </div>
        <div className=" justify-center hidden lg:block items-center  lg:mt-[70px]">
          <img
            src="/homeloanimg/homegif.gif"
            alt=""
            className="h-auto max-w-full w-[300px] sm:w-[350px] lg:w-[650px] lg:ml-[50px] lg:h-[549px]"
          />
        </div>
      </div>
      </div>
       
       <div className="landingfooter">
      <LoanNav/>
       <HomeAccorrdion/>
      <EmiCalculator/>
      </div>
      </div>
    </>
  );
}
