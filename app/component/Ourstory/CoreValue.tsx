"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SecHr from "../common/SecDivider/SecHr";
import { AboutType } from "@/app/types/AboutType";
import parse from 'html-react-parser'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const CoreValue = ({data}:{
  data:AboutType
}) => {
  return (
    <motion.section
      className="section-spacing overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}>
      <div className="container">
        <div className="mb-4 md:mb-[60px]">
          <SecHr title="Core Values & Expertise" />
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
          <div className="col-span-8">
            <motion.div
              className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none"
              variants={slideRight}>
              <h2 className="text-lg font-bold text-black">
                {data?.data[0].core_value.title}
              </h2>
              <div className="leading-relaxed text-black/75">
                {parse(data?.data[0].core_value.content || "")}
              </div>

              <div className="  w-full flex ">
                <motion.div
                  variants={fadeIn}
                  className="flex gap-2 lg:gap-[12px] justify-center bg-black/10 backdrop-blur-[10px]  px-4 py-3 rounded-full">
                  {data?.data[0].core_value.seals.map((item,index)=>(
                    <Image key={index}
                    src={item.logo || "data:"}
                    alt=""
                    width={80}
                    height={80}
                  />
                  ))}
                  
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={slideLeft}
            className="relative w-full h-[300px] md:h-[500px] col-span-4">
            <Image
              src={data?.data[0].core_value.image || "data:"}
              alt={data?.data[0].core_value.altTag}
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CoreValue;
