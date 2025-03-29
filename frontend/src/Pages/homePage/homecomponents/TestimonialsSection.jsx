import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const TrustedClients = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Kshtij",
      time: "04 June 2024",
      rating: 5,
      review:
        "I had a fantastic experience with incentum. The loan application process was straightforward, and their team was incredibly helpful in guiding me through every step. I received my loan approval quickly and at competitive interest rates. The transparency they offer is commendable—no hidden fees or surprises. I highly recommend their services to anyone looking for reliable financial support!",
    },
    {
      id: 2,
      name: "Armen Sargsyan",
      time: "04 June 2024",
      rating: 5,
      review:
        "Incentum made securing a loan stress-free. The agents were professional and responsive, answering all my questions promptly. While the interest rates were slightly higher than expected, the service quality and fast processing made up for it. It’s a trustworthy platform that I’d use again if needed. Best company I have ever visited!",
    },
    {
      id: 3,
      name: "Nisha Nair",
      time: "15 May 2024",
      rating: 4,
      review:
        "The process was mostly smooth, and I appreciate the support I received from the team. They answered all my queries patiently and ensured I had all the information I needed. The approval time was slightly longer than expected, but the transparency and professionalism made up for it. Overall, a reliable service for loan seekers!",
    },
    {
      id: 4,
      name: "Nivaan Bhosole",
      time: "10 April 2024",
      rating: 5,
      review:
        "Exceptional service from start to finish! Incentum made what could have been a stressful process very manageable. I was impressed with the user-friendly application process and the quick responses from their team. The interest rates were competitive, and the terms were explained clearly. Highly recommend this platform for anyone looking for financial assistance!",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center text-white rounded-2xl py-6 sm:py-10 sm:px-12 lg:px-20 max-w-7xl h-auto mx-auto">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="relative text-center mb-8" ref={headingRef}>
          <div className="inline-block relative">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide leading-snug text-black drop-shadow-lg">
              Our Trusted Clients
            </h1>
            <span className={`absolute left-0 bottom-[-8px] h-1 bg-black rounded-full transition-all duration-1000 ease-in-out ${isVisible ? "w-full" : "w-0"}`}></span>
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
          slidesPerView={3}
          centeredSlides={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id}>
              <div
                className={`relative bg-gray-800 text-white rounded-xl p-6 mt-3 shadow-lg flex flex-col items-center text-center transition-all duration-500 ${
                  activeIndex === index ? "scale-110 shadow-2xl" : "opacity-95 scale-90"
                }`}
              >
                <div className="absolute top-0 left-0 w-5/6 h-1 border-t-8 border-l-4 border-yellow-500 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-5/6 h-1 border-b-8 border-r-4 border-yellow-500 rounded-br-lg"></div>

                <h2 className="text-lg font-semibold text-yellow-500">{review.name}</h2>
                <p className="text-sm text-gray-400">{review.time}</p>
                <p className="text-lg text-yellow-400">{"★".repeat(review.rating)}</p>
                <p className="text-sm font-light text-gray-300 leading-relaxed mt-2">
                  {review.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrustedClients;
