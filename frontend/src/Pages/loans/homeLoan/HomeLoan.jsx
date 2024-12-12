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
            Drive The Car You've Always Dreamed Of, With Ease
          </h2>
          <div className="flex lg:hidden justify-center items-center mt-12 lg:mt-[310px]">
            <img
              src="/homeloanimg/homegif.gif"
              alt=""
              className="h-auto max-w-full w-[300px] sm:w-[500px] lg:w-[700px] lg:h-[500px]"
            />
          </div>
          <p className="text-md sm:text-lg lg:text-[14px] leading-[20px] sm:leading-[25px] lg:leading-[29px] text-gray-800 mt-4 lg:mt-3">
           We know owning you dream car isn't about the ride, it's about the freedom and joy that comes with is. Our AI driven consultantion is here to make that happen, without the stress. Whether you're eyeing a aleek sports car, a family-friendly SUV, or a reliable everyday vehicle, we,ve got you covered.{" "}
          </p>
   
          <p className="text-md sm:text-lg lg:text-[14px]  leading-[20px] sm:leading-[25px] lg:leading-[29px] text-gray-800">
            We bring you any and every feature of car loan being offered by indian financial institution. Be it flexible repayment options, competitive rate, and quick approval, we take care of the complicated stuff so you can focus on what matters most-enjoying the road ahead.
          </p>
          <h2 className="text-xl  lg:text-[22px]  mt-4 lg:mt-6 lg:leading-7 ">
            And yes, we will incentivise you too.
          </h2>
          <h2 className="text-xl lg:text-[20px] lg:leading-7 ">
            You are a click away from your dream car. Are you ready for the
            drive of your dreams?
          </h2>
          <Link to={'/home-details-HomeOne'}>
          <Button/>
          </Link>
        
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
