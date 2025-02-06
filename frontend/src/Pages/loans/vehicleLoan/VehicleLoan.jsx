import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EmiCalculator from "../../homePage/homecomponents/EmiCalculator";
import VehicleAccordion from "./VehicleAccordion";
import LoanNav from "../../../components/loanSec/LoanNav";
import Button from "../../../components/loanSec/Button";

export default function VehicleLoan() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  };

  return (
    <>
      <div className="scroll-smooth focus:scroll-auto">
        <div className="landingheader">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 lg:px-0">
            <div className="mt-4 lg:mt-[50px] lg:ml-[120px]">
              <motion.div {...slideInLeft}>
                <button className="mb-4 lg:mb-6 hover:scale-105 hover:shadow-lg transform transition-all duration-300">
                  <Link
                    className="bg-primary text-white text-sm sm:text-md px-4 py-3 md:px-5 md:py-3 rounded-full font-medium hover:bg-blue-800"
                  >
                    VEHICLE LOAN
                  </Link>
                </button>
              </motion.div>

              <motion.h2
                {...fadeInUp}
                className="font-bold text-[26px] sm:text-[48px] lg:text-[50px] leading-[44px] sm:leading-[60px] lg:leading-[55px]"
              >
                Drive The Car You've Always Dreamed Of, With Ease
              </motion.h2>

              <div className="flex lg:hidden justify-center items-center mt-12 lg:mt-[310px]">
                <motion.img
                  {...scaleIn}
                  src="/vehicleloanimg/carGIf.gif"
                  alt=""
                  className="h-auto max-w-full w-[300px] sm:w-[500px] lg:w-[700px] lg:h-[500px]"
                />
              </div>

              <motion.p
                {...fadeInUp}
                className="text-md sm:text-lg lg:text-[18px] leading-[24px] sm:leading-[28px] lg:leading-[32px] text-gray-800 mt-4 lg:mt-3"
              >
                We know owning your dream car isn't just about the ride, it's
                about the freedom and joy that comes with it. Our AI-driven
                consultation is here to make that happen, without the stress.
              </motion.p>

              <motion.p
                {...fadeInUp}
                className="text-md sm:text-lg lg:text-[18px] leading-[24px] sm:leading-[28px] lg:leading-[32px] text-gray-800"
              >
                We bring you every feature of a car loan offered by Indian financial
                institutions. Flexible repayment options, competitive rates, and quick
                approvals — our goal is to simplify the process so you can enjoy the
                journey ahead.
              </motion.p>

              <motion.h2
                {...fadeInUp}
                className="text-xl p-1 text-white bg-blue-800 font-bold lg:text-[22px] mt-4 lg:mt-6 lg:leading-7"
              >
                And yes, we will incentivize you too.
              </motion.h2>

              <motion.h2
                {...fadeInUp}
                className="text-xl lg:text-[20px] lg:leading-7"
              >
                You’re just a click away from your dream car. Are you ready for
                the drive of your life?
              </motion.h2>

              <motion.div {...slideInLeft}>
                <Link to="/vehicle-details-Vehicleone">
                  <Button />
                </Link>
              </motion.div>
            </div>

            <div className="justify-center hidden lg:block items-center lg:mt-[70px]">
              <motion.img
                {...slideInRight}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                src="/vehicleloanimg/carGIf.gif"
                alt="Vehicle Loan GIF"
                className="h-auto max-w-full w-[300px] sm:w-[350px] lg:w-[650px] lg:ml-[50px] lg:h-[549px] rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="landingfooter">
          <motion.div {...fadeInUp}>
            <LoanNav />
            <VehicleAccordion />
            <EmiCalculator />
          </motion.div>
        </div>
      </div>
    </>
  );
}
