"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ButtonWithIcon from "../common/Buttons/ButtonWithIcon";

type ImageCardProps = {
  image: string;
  title: string;
  subTitle: string;
  date: string;
};

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subTitle,
  date,
}) => {
  return (
    <motion.div
      className="relative h-[300px] lg:h-[470px] overflow-hidden rounded-custom shadow-lg group "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}>
      {/* Image with gradient overlay */}
      <div className="relative w-full h-full">
        <Image src={image} alt={title} fill className="object-cover" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 rounded-custom"></div> */}
        <div className="absolute top-5 right-5 text-white uppercase  p-[12px] backdrop-blur-[10px] bg-white/10 rounded-[8px]">
          <p className="text-[14px] ">{date}</p>
        </div>
      </div>

      <motion.div
        className="absolute flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}>
        {/* Title and Icons Row */}
        <div className="w-full">
          <p className="text-[14px] text-white/80 uppercase mb-[20px]">
            {subTitle}
          </p>
          <h4 className="text-[22px] font-[600] text-white  lg:w-[90%] leading-[28.6px] mt-0 mb-[32px]">
            {title}
          </h4>
          <ButtonWithIcon link="" buttonText="Read More" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ImageCard;
