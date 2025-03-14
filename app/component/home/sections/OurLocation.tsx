"use client";
import Image from "next/image";
import React from "react";
import map from "@/public/assets/img/home/map.svg";
import { motion } from "framer-motion"; // Import motion
import parse from 'html-react-parser'
import { HomeType } from "@/app/types/HomeType";

const OurLocation = ({data}:{
  data:HomeType
}) => {
  return (
    <section className="section-spacing relative overflow-hidden">
      <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
        <Image
          className="absolute object-cover object-center h-full"
          src="/assets/img/home/Our_location.jpg"
          alt=""
          width={2520}
          height={800}
        />
      </figure>
      <div className="container">
        {/* Section Header with Animation */}
        <motion.div
          className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} // Animation resets on scroll
        >
          <span className="w-[24px] h-[2px] bg-primary"></span>
          <span className="w-[450px] leading-none uppercase text-[16px]">
            Our location
          </span>
          <hr className="opacity-10 w-[100%]" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-[20px]  mt-6">
          {/* Title with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }} // Animation resets on scroll
          >
            {/* <h2 className="text-[20px] font-bold text-white uppercase leading-normal mt-[10%]">
              With a strong presence across the UAE, Building Co. (BEST) L.L.C
              operates in all emirates, with offices in Dubai, Sharjah, and Abu
              Dhabi, delivering high-quality construction solutions tailored to
              diverse project needs. Our strategic locations enable us to
              efficiently serve clients nationwide, ensuring excellence,
              innovation, and timely project execution across the region.
            </h2> */}
            <div className="text-[20px] font-bold text-white uppercase leading-normal mt-[10%]">
              {parse(data?.data[0].location || "")}
            </div>
          </motion.div>

          {/* Map Image with Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }} // Animation resets on scroll
          >
            <Image src={map} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
