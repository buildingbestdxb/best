"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import mission from "@/public/assets/img/icons/mission.svg";
import vision from "@/public/assets/img/icons/vision.svg";

const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const SectionBox = ({
  title,
  text,
  imgSrc,
  altText,
}: {
  title: string;
  text: string;
  imgSrc: string;
  altText: string;
}) => (
  <motion.div
    className="p-6 lg:p-12 text-white bg-black rounded-custom h-full"
    variants={boxVariants}>
    <motion.div variants={iconVariants}>
      <Image src={imgSrc} alt={altText} className="mb-5 lg:mb-10" />
    </motion.div>
    <h3 className="text-lg font-semibold uppercase leading-none mb-5">
      {title}
    </h3>
    <p className="text-white/70">{text}</p>
  </motion.div>
);

const VisionMission = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container">
        <motion.div
          className="flex items-center space-x-6 text-primary text-sm font-medium mb-5 lg:mb-14"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <span className="w-6 h-[2px] bg-primary"></span>
          <span className="w-auto leading-none uppercase text-base">
            Vision & Mission
          </span>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-6 xl:gap-[80px] items-start mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}>
          <SectionBox
            title="Mission"
            text="At Building Co. (BEST) L.L.C, our mission is to deliver world-class construction solutions that set the industry benchmark for quality, innovation, and efficiency. With an unwavering commitment to excellence, we ensure that every project meets the highest construction standards, integrating precision engineering, safety, reliability, and environmental responsibility. Our goal is to create lasting value for our clients and communities by delivering projects that exemplify superior craftsmanship and technical expertise."
            imgSrc={mission}
            altText="Mission Icon"
          />
          <SectionBox
            title="Vision"
            text="To be the leading force in the construction industry, recognized for our ability to deliver complex projects with unmatched expertise and strict adherence to the highest construction standards. We strive to push the boundaries of innovation by leveraging cutting-edge technologies, enhancing efficiency, and maintaining superior quality. At Building Co. (BEST) L.L.C, we are committed to shaping the future of construction with projects that stand the test of time."
            imgSrc={vision}
            altText="Vision Icon"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
