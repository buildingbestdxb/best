"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import parse from 'html-react-parser'
import useSWR from "swr";
import { HomeType } from "@/app/types/HomeType";
import { SectorType } from "@/app/types/SectorType";
import Link from "next/link";



const SectorsSec = ({data}:{
  data:HomeType
}) => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data:sectorData }:{data:SectorType} = useSWR(`/api/admin/sector`, fetcher)


  useEffect(()=>{
    console.log(sectorData)
  },[sectorData])
  
  return (
    <section className="section-spacing bg-custom-gray overflow-hidden">
      <div className="container">
        {/* Section Header Animation */}
        <motion.div
          className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}>
          <span className="w-[24px] h-[2px] bg-primary"></span>
          <span className="w-[100px] leading-none uppercase text-[16px]">
            Sectors
          </span>
          <hr className="w-full" />
        </motion.div>

        {/* Section Title and Description Animation */}
        <motion.div
          className="lg:w-[50%]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-5 lg:mb-[30px] leading-none text-black">
            {data?.data[0]?.sectorHeading}
          </h2>
          {/* <p className="text-black/75">
            We build across diverse sectors, delivering tailored construction
            solutions that meet industry demands with excellence, innovation,
            and reliability.
          </p> */}
          <div className="text-black/75">
              {parse(data?.data[0]?.sectorDescription || "")}
          </div>
        </motion.div>

        {/* Grid Section with Sectors */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-[10px] items-center mt-5 lg:mt-[60px]">
          {sectorData?.data.map((sector, index) => (
            <Link href={`/projects/${sector.name.toLowerCase()}`} key={sector._id}><motion.div
              
              className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-custom shadow-lg group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}>
              <Image
                src={sector.image}
                alt="Background Image"
                fill
                className="object-cover"
              />

              <motion.div
                className="absolute flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom flex flex-col gap-[20px] group-hover:bg-primary transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}>
                <Image
                  src={sector.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="transition-all duration-500 group-hover:invert group-hover:brightness-0"
                />
                <motion.div
                  className="flex justify-between items-center w-full"
                  whileHover={{ opacity: 1 }}>
                  <h4 className="text-md font-semibold text-white transition-opacity duration-500">
                    {sector.name}
                  </h4>
                  <Image
                    src="/assets/img/icons/arwtp.svg"
                    alt=""
                    width={0}
                    height={0}
                    className="transition-all duration-500 ease-in-out group-hover:w-[14px]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSec;
