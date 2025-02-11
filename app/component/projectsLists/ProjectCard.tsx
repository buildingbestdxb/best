"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type ProjectCardProps = {
  image: string;
  title: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title }) => {
  return (
    <motion.div
      className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-custom shadow-lg group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}>
      {/* Image with gradient overlay */}
      <div className="relative w-full h-full">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 rounded-custom"></div>
      </div>

      <motion.div
        className="absolute flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom group-hover:bg-primary transition-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}>
        {/* Title and Icons Row */}
        <div className="flex justify-between items-center w-full">
          <h4 className="text-md font-semibold text-white transition-opacity duration-500">
            {title}
          </h4>

          {/* Dot & Arrow Icon */}
          <div className="flex items-center">
            <div className="w-[8px] h-[8px] bg-primary rounded-full transition-opacity duration-500 opacity-100 group-hover:opacity-0"></div>
            <Image
              src="/assets/img/icons/arwtp.svg"
              alt="Arrow Icon"
              width={14}
              height={14}
              className="transition-opacity duration-500 opacity-0 group-hover:opacity-100 ml-2"
            />
          </div>
        </div>

        {/* Expandable Description Container */}
        <motion.div className="h-0 overflow-hidden group-hover:h-[50px] transition-[height] duration-500 ease-in-out">
          <div className="flex ">
            <p className="text-sm text-white mt-2 opacity-100">
              This is a short description for the project.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
