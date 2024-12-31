import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EmiCalculator from "../../homePage/homecomponents/EmiCalculator";
import HomeAccorrdion from "./HomeAccorrdion";
import LoanNav from "../../../components/loanSec/LoanNav";
import Button from "../../../components/loanSec/Button";

export default function HomeLoan() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -100 }, // Increased X offset for dramatic entry
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 100 }, // Increased X offset for dramatic entry
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
            <div className="mt-4 lg:mt-[70px] lg:ml-[120px]">
            <motion.div {...slideInLeft}>
  <button className="mb-4 lg:mb-6 hover:scale-105 hover:shadow-lg transform transition-all duration-300">
    <Link
      className="bg-primary text-white text-sm sm:text-md px-4 py-3 md:px-5 md:py-3 rounded-full font-medium 
      hover:bg-blue-800 "
    >
      HOME LOAN
    </Link>
  </button>
</motion.div>




              <motion.h2
                {...fadeInUp}
                className="font-bold text-[26px] sm:text-[48px] lg:text-[50px] leading-[44px] sm:leading-[60px] lg:leading-[55px]"
              >
                Step Into Your Dream Home with Confidence
              </motion.h2>

              <div className="flex lg:hidden justify-center items-center mt-12 lg:mt-[310px]">
                <motion.img
                  {...scaleIn}
                  src="/homeloanimg/homegif.gif"
                  alt=""
                  className="h-auto max-w-full w-[300px] sm:w-[500px] lg:w-[700px] lg:h-[500px]"
                />
              </div>

              <motion.p
                {...fadeInUp}
                className="text-md sm:text-lg lg:text-[14px] leading-[20px] sm:leading-[25px] lg:leading-[29px] text-gray-800 mt-4 lg:mt-3"
              >
                Owning a home is one of life’s most significant milestones—a
                symbol of security, comfort, and achievement. At INCENTUM, we
                are committed to turning this aspiration into reality by
                providing seamless and expert-guided home loan solutions.
              </motion.p>

              <motion.p
                {...fadeInUp}
                className="text-md sm:text-lg lg:text-[14px] leading-[20px] sm:leading-[25px] lg:leading-[29px] text-gray-800"
              >
                We partner with leading financial institutions across India to
                bring you competitive interest rates, flexible repayment
                tenures, and expedited approvals. By handling the complexities
                of the home loan process, we empower you to focus on what truly
                matters—creating a haven for your loved ones.
              </motion.p>

              <motion.h2
                {...fadeInUp}
                className="text-xl lg:text-[22px] mt-4 lg:mt-6 lg:leading-7"
              >
                And yes, our incentives add an extra reason to celebrate.
              </motion.h2>

              <motion.h2
                {...fadeInUp}
                className="text-xl lg:text-[20px] lg:leading-7"
              >
                Take the first step today and transform your dream into an
                address!
              </motion.h2>

              <motion.div {...slideInLeft}>
                <Button />
              </motion.div>
            </div>

            <div className="justify-center hidden lg:block items-center lg:mt-[70px]">
  <motion.img
    {...slideInRight} // Slide-in animation
    whileHover={{
      scale: 1.05, // Enlarge only the GIF
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)", // Add shadow to GIF
    }}
    transition={{ duration: 0.3 }} // Smooth transition
    src="/homeloanimg/homegif.gif"
    alt="Home Loan GIF"
    className="h-auto max-w-full w-[300px] sm:w-[350px] lg:w-[650px] lg:ml-[50px] lg:h-[549px] rounded-lg"
  />
</div>


          </div>
        </div>

        <div className="landingfooter">
          <motion.div {...fadeInUp}>
            <LoanNav />
            <HomeAccorrdion />
            <EmiCalculator />
          </motion.div>
        </div>
      </div>
    </>
  );
}
