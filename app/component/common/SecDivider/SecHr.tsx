"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";

interface SecHrProps {
  title: string;
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const SecHr: FC<SecHrProps> = ({ title }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]">
      <span className="w-[24px] h-[2px] bg-primary"></span>
      <span className="w-[160px] leading-none uppercase text-[16px]">
        {title}
      </span>
      <hr className="w-full" />
    </motion.div>
  );
};

export default SecHr;
