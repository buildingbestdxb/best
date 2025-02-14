"use client";
import Image from "next/image";

import React from "react";
import SecHr from "../common/SecDivider/SecHr";
import { motion } from "framer-motion";

const Historysec = () => {
  return (
    <>
      <section className="  bg-secondary/20">
        <div className="container">
          <div className="py-[60px] md:py-[80px] lg:py-[100px]]">
            <div className="mb-4 md:mb-[60px]">
              <SecHr title="Our History" />
            </div>
            <div className="lg:grid lg:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
              <motion.div className="relative w-full h-[200px] md:h-[300px] col-span-4">
                <Image
                  src="/assets/img/story/history.jpg"
                  alt="history"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              <div className="col-span-8">
                <motion.div className="flex flex-col  gap-[12px] lg:gap-[32px] leading-none">
                  <h2 className="text-xxl font-black">2010</h2>
                  <p className="font-sm leading-[1.4] text-secondary/75">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>

                  <p className="font-sm leading-[1.4] text-secondary/75">
                  &quot;Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.{" "}
                  </p>
                </motion.div>
              </div>
            </div>
            <div className="flex items-center justify-between   w-full  pt-[60px] md:pt-[80px] lg:pt-[120px]">
          <div className="relative flex w-full items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2"></div>

            <div className="flex flex-col md:flex-row w-full justify-between gap-2 md-gap-0">
              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  1975
                </span>
                    <div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  1980
                </span><div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  1999
                </span><div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5 mb-2 md:mb-0">
                <span className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold scale-110">
                  2010
                </span>
                    <div className="w-6 h-6 bg-primary flex justify-center items-center rounded-full  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  2014
                </span><div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  2017
                </span><div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  2020
                </span><div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>

              <div className="relative flex flex-col items-center gap-3 md:gap-5">
                <span className="bg-black/30 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  2024
                </span><div className="w-6 h-6 bg-[#d2d2d2] flex justify-center items-center  ">
                      <div className="w-[10px] h-[10px] bg-primary  rounded-full  "></div>
                    </div>
              </div>
                </div>

          </div>
        </div>
        <div className="border-t-2 w-full relative border-black/30 bottom-3 z-[-1] h-2 hidden md:block"></div>
          </div>


        </div>
      </section>
    </>
  );
};

export default Historysec;
