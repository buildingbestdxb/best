"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AboutType } from "@/app/types/AboutType";

const logos = [
  "/assets/img/clients/cl-01.png",
  // "/assets/img/clients/cl-02.png",
  "/assets/img/clients/cl-03.png",
  "/assets/img/clients/cl-04.png",
  "/assets/img/clients/cl-05.png",
  "/assets/img/clients/cl-06.png",
  "/assets/img/clients/cl-07.png",
  "/assets/img/clients/cl-08.png",

  "/assets/img/clients/cl-01.png",
  // "/assets/img/clients/cl-02.png",
  "/assets/img/clients/cl-03.png",
  "/assets/img/clients/cl-04.png",
  "/assets/img/clients/cl-05.png",
  "/assets/img/clients/cl-06.png",
  "/assets/img/clients/cl-07.png",
  "/assets/img/clients/cl-08.png",
];

const LogoTicker = ({data}:{
  data?:AboutType
}) => {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-fluid">
        {/* <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-5 lg:gap-14 flex-none min-w-max"
            animate={{
              x: "-50%",
            }}
            transition={{
              duration: 25, // Adjust duration for smoothness
              repeat: Infinity,
              ease: "linear",
            }}>
            {data ? data?.data[0]?.strength_and_vision.clients.map((item, index) => (
              <Image
                key={index}
                src={item.logo || "data:"}
                alt="client logo"
                width={150}
                height={80}
                className="logo-ticker-image"
              />
            )) :
              logos.map((item,index)=>(
                <Image
                key={index}
                src={item}
                alt="client logo"
                width={150}
                height={80}
                className="logo-ticker-image"
              />
              ))
            }
          </motion.div>
        </div> */}
      <Swiper
        slidesPerView="auto" // Adjusts number of logos based on screen size
        spaceBetween={30} // Space between logos
        loop={true} // Enables infinite scrolling
        autoplay={{ delay: 0, disableOnInteraction: false }} // Continuous scroll
        speed={5000} // Adjust for smoothness
        modules={[Autoplay]} // Use autoplay module
        className="mySwiper"
      >

        {logos.map((logo, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <Image
              src={logo || "data:"}
              alt="client logo"
              width={150}
              height={80}
              className="logo-ticker-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      </div>
    </section>
  );
};

export default LogoTicker;
