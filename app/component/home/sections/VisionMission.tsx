"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import mission from "@/public/assets/img/icons/mission.svg";
import vision from "@/public/assets/img/icons/vision.svg";

const VisionMission = () => {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container">
        {/* Section Header Animation */}
        <motion.div
          className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="w-[24px] h-[2px] bg-primary"></span>
          <span className="w-[430px] leading-none uppercase text-[16px]">
            Vision & Mission
          </span>
          <hr className="w-[100%]" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-[10px] items-start mt-6">
          {/* Mission Box */}
          <motion.div
            className="p-[25px] lg:p-[52px] text-white bg-black rounded-custom"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Mission Icon Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image src={mission} alt="" className="mb-5 lg:mb-[40px]" />
            </motion.div>

            <h3 className="text-lg font-semibold uppercase leading-none mb-5">
              Mission
            </h3>
            <p className="text-white/55">
              Since 1975, BUILDING CO. (BEST) L.L.C metaphors to lead the
              phenomenal construction industry revolution, with its goal of
              excellence, the Company earned reputation of delivering an
              exceptional construction services in the UAE. Throughout its
              commitment towards greater endeavor, BUILDING CO. (BEST) L.L.C
              created an outstanding distinction from its PRIDE Core Foundation
              — Planning, Reliability, Innovation, Determination and Excellence.
            </p>
          </motion.div>

          {/* Vision Box */}
          <motion.div
            className="p-[25px] lg:p-[52px] text-white bg-black rounded-custom"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Vision Icon Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image src={vision} alt="" className="mb-5 lg:mb-[40px]" />
            </motion.div>

            <h3 className="text-lg font-semibold uppercase leading-none mb-5">
              Vision
            </h3>
            <p className="text-white/55">
              Since 1975, BUILDING CO. (BEST) L.L.C metaphors to lead the
              phenomenal construction industry revolution, with its goal of
              excellence, the Company earned reputation of delivering an
              exceptional construction services in the UAE. Throughout its
              commitment towards greater endeavor, BUILDING CO. (BEST) L.L.C
              created an outstanding distinction from its PRIDE Core Foundation
              — Planning, Reliability, Innovation, Determination and Excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
