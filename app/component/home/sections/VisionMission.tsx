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

const SectionBox = ({ title, text, imgSrc, altText }: { title: string; text: string; imgSrc: string; altText: string }) => (
  <motion.div className="p-6 lg:p-12 text-white bg-black rounded-custom" variants={boxVariants}>
    <motion.div variants={iconVariants}>
      <Image src={imgSrc} alt={altText} className="mb-5 lg:mb-10" />
    </motion.div>
    <h3 className="text-lg font-semibold uppercase leading-none mb-5">{title}</h3>
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
          viewport={{ once: true }}
        >
          <span className="w-6 h-[2px] bg-primary"></span>
          <span className="w-auto leading-none uppercase text-base">Vision & Mission</span>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-6 xl:gap-[80px] items-start mt-6" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}>
          <SectionBox
            title="Mission"
            text="Since 1975, BUILDING CO. (BEST) L.L.C has led the construction industry revolution, earning a reputation for delivering exceptional services in the UAE. Its foundation—Planning, Reliability, Innovation, Determination, and Excellence—drives its commitment to excellence."
            imgSrc={mission}
            altText="Mission Icon"
          />
          <SectionBox
            title="Vision"
            text="BUILDING CO. (BEST) L.L.C aims to redefine the construction industry through innovation and reliability, ensuring excellence in every project. Guided by a strong core foundation, the company continues to set industry standards."
            imgSrc={vision}
            altText="Vision Icon"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
