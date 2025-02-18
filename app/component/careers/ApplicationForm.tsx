"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion

export default function ApplicationForm() {
  return (
    <div className=" relative overflow-hidden pb-[100px]">
      <div className="container p-0">
        {/* Section Header with Animation */}

        <div>
          <div className=" bg-black/5 text-black rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px]">
            <motion.h2
              className="lg:text-[32px] text-[25px] font-bold uppercase mb-3 lg:mb-[20px] xl:max-w-[74%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              If you are interested in pursuing a position with Best Group,
              kindly fill out the form provided below.
            </motion.h2>

            <form className="flex flex-col gap-[32px]">
              <div className="grid grid-cols-2 gap-4">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="text"
                  placeholder="First Name"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="text"
                  placeholder="Last Name"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />

                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Phone Number"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>{" "}
              <div className="grid lg:grid-cols-2 gap-[32px] ">
                {/* Gender Selection */}
                <motion.div
                  className="col-span-2 flex gap-6 items-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <span className="text-black/50 text-[18px]">Gender:</span>
                  {["Male", "Female", "Other"].map((gender) => (
                    <label
                      key={gender}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender.toLowerCase()}
                        className="hidden peer"
                      />
                      <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                        <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                      </div>
                      <span className="text-black/50 text-[18px]">
                        {gender}
                      </span>
                    </label>
                  ))}
                </motion.div>
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Date of Birth"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />

                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Nationality"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Current Location"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />

                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Work Experience"
                  required
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <motion.textarea
                  placeholder="Key Skills"
                  rows={4}
                  required
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10  text-black/50 placeholder:text-black/50 focus:outline-none"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <label
                    htmlFor="resume"
                    className="block  text-black/50 text-[18px] mb-[16px]">
                    Upload Resume
                  </label>
                  <div className="bg-black/10 rounded-custom p-3 mt-2 relative">
                    <input
                      id="resume"
                      type="file"
                      className="block w-full text-[16px] text-black/60 file:py-2 file:px-8 file:rounded-lg file:border-0 file:text-[16px] file:bg-black file:text-white hover:file:bg-black/20 pr-[3em]"
                    />
                    {/* <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image
                        src={"/assets/img/careers/file.svg"}
                        alt="Upload icon"
                        width={16}
                        height={16}
                      />
                    </div> */}
                  </div>
                </motion.div>
              </div>
              <Link
                href="#"
                className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn orng">
                <div>
                  <Image
                    src={"/assets/img/icons/arrow.svg"}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>
                Send Message
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
