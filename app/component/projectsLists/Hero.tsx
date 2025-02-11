"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const slide = {
  imageSrc: "/assets/img/projects/banner.jpg",
  title: "Commercial ",
  light: "Projects",
};

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        {/* <div className="overlay absolute w-full h-full bg-black opacity-50 z-[1]"></div> */}
        <Image
          src={slide.imageSrc}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-[0.6]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="absolute inset-0 flex flex-col justify-between items-start text-left z-[2] container py-10">
          <motion.p
            variants={textVariants}
            className="text-white/50 pt-[100px] text-[16px] font-[500]">
            Home / Projects /{" "}
            <span className="font-bold text-primary">Commercial Projects</span>
          </motion.p>

          <motion.h1
            variants={textVariants}
            className="text-white text-xxl leading-none  pb-10 font-black">
            {slide.title} <span className="font-light">{slide.light}</span>
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
