"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof addresses>(
    "Sharjah (Headquarters)"
  );
  /* const [activeTab, setActiveTab] = useState('Sharjah'); */

  const addresses = {
    "Sharjah (Headquarters)":
      "1st Floor, Faya Business Building, Al Majaz Northern Park St., Al Majaz 2, Sharjah – UAE",
    Dubai: "Office No. 401, The Exchange Tower, Business Bay, Dubai, UAE.",
    "Abu Dhabi":
      "Office 1814, 18th Floor, Najda Street, Al Khazana Tower, Abu Dhabi, United Arab Emirates",
  };

  return (
    <footer className="bg-black text-white border-t-[5px] border-primary overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[35px] lg:gap-8  pt-[60px] lg:pt-[120px] pb-[40px] lg:pb-[80px]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-4">
          <div className="mb-5 lg:mb-[40px] text-center w-fit">
          <Link href="/" >
          <div className="inline-block">
            <Image
              src="/Logo.svg"
              className=" h-[80px] lg:h-[95px] w-auto"
              alt=""
              width={150}
              height={80}
            />
          </div>
          
          <p className="text-sm font-[500] text-white mt-1 text-center   ">Building Co. BEST L.L.C</p>
          </Link>
          </div>
          <h4 className="text-[18px]  uppercase leading-none font-bold mb-3 lg:mb-[20px]">
            Follow us
          </h4>
          <div className="flex space-x-3 mt-4">
            {/* <div className="cursor-pointer bg-white/10 w-[50px] h-[50px] rounded-full leading-[50px] flex justify-center items-center hover:bg-primary transition-all duration-500 ease-in-out">
              <FaFacebookF className="" />
            </div> */}
            <div className="cursor-pointer bg-white/10 w-[50px] h-[50px] rounded-full flex justify-center items-center hover:bg-primary transition-all duration-500 ease-in-out">
            <Link href={'https://www.linkedin.com/company/best-building'} target="_blank">  <FaLinkedinIn className="" /></Link>
            </div>
            <div className="cursor-pointer bg-white/10 w-[50px] h-[50px] rounded-full flex justify-center items-center hover:bg-primary transition-all duration-500 ease-in-out">
            <Link href={'https://www.instagram.com/buildingco.best/'} target="_blank">      <FaInstagram className="" /></Link>
            </div>
            {/* <div className="cursor-pointer bg-white/10 w-[50px] h-[50px] rounded-full flex justify-center items-center hover:bg-primary transition-all duration-500 ease-in-out">
              <FaYoutube className="" />
            </div> */}
          </div>
          <div className="mt-5 md:pt-5 "> 
          <a href={"/assets/pdf/profile.pdf"} download 
                className="self-start py-4 text-white bg-primary   rounded-lg text-sm font-medium transition spckbtn uppercase " style={{display:'inline-block'}}>
                <div>
                  <Image
                    src={"/assets/img/icons/arrow.svg"}
                    alt=""
                    width={30}
                    height={30}
                  />
                </div>{" "}
                Download Profile
              </a></div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="col-span-2">
          <h3 className="text-[18px] uppercase font-bold mb-3 lg:mb-[20px]">
            Quick Links
          </h3>
          <ul className="space-y-[16px]">
            <li>
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/company-overview" className="hover:text-orange-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-orange-500">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/accreditations" className="hover:text-orange-500">
                Accreditations
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="col-span-2 space-y-[20px] lg:space-y-[40px]">
          <div>
            <h3 className="text-[18px] uppercase font-bold mb-1 lg:mb-[20px]">
              Phone
            </h3>
            <a href="tel:+97165610999" className="text-orange-500">
              +971 6 5610999
            </a>
          </div>
          <div>
            <h3 className="text-[18px] uppercase font-bold mb-1 lg:mb-[20px]">
              Fax
            </h3>
            <a href="tel:+97165610999" className="text-orange-500">
              +971 6 5610055
            </a>
          </div>
          <div>
            <h3 className="text-[18px] uppercase font-bold mb-1 lg:mb-[20px]">
              Email
            </h3>
            <a href="tel:+97165610999" className="text-orange-500">
              info@bestbcc.com
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="col-span-4">
          <h3 className="text-[18px] uppercase font-bold mb-3 lg:mb-[20px]">
            Address
          </h3>
          <div className="lg:flex lg:space-x-5 mb-3 lg:mb-[20px] space-y-2 lg:space-y-0">
            {(Object.keys(addresses) as Array<keyof typeof addresses>).map(
              (city) => (
                <button
                  key={city}
                  className={`flex items-center gap-2 text-[16px] uppercase ${
                    activeTab === city
                      ? "text-white"
                      : "bg-transparent text-white/50"
                  }`}
                  onClick={() => setActiveTab(city)}>
                  <div
                    className={`w-[5px] h-[5px] rounded-full ${
                      activeTab === city ? "bg-primary" : "bg-white/50"
                    }`}></div>{" "}
                  {city}
                </button>
              )
            )}
          </div>
          <p className="text-sm lg:w-[75%]">
            {addresses[activeTab as keyof typeof addresses] ??
              "No address available"}
          </p>
          <h3 className="text-[18px] uppercase font-bold mb-3 lg:mb-[20px] mt-6 mt-[40px]">
            Newsletter
          </h3>
          <div className="flex rounded-lg overflow-hidden relative h-[60px] border-b-[2px] border-primary">
            <input
              type="email"
              placeholder="Email"
              className="bg-black text-white px-3 py-2 flex-1 focus:outline-none absolute h-full border-none  bg-white/10 w-full"
            />
            <button className="bg-transparent px-4 py-2 absolute h-full right-0 opacity-50  flex items-center gap-2 hover:opacity-100 transition-all ease-in-out duration-500">
              Subscribe{" "}
              <Image
                src={"/assets/img/icons/arrow-right.svg"}
                alt=""
                width={16}
                height={16}
              />
            </button>
          </div>
        </motion.div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-white/10 py-5 lg:py-[40px]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="md:flex flex-row-reverse justify-between space-y-3 md:space-y-0">
            <ul className="flex gap-3 justify-center">
              <li>
                <Link
                  href=""
                  className="text-white/50 text-[14px] font-light hover:text-white transition-all ease-in-out duration-500">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-white/50 text-[14px] pl-3 border-l border-white/20 hover:text-white transition-all ease-in-out duration-500">
                  Terms of use
                </Link>
              </li>
            </ul>
            <p className="text-[14px] text-white/50 font-light">
              {" "}
              © {new Date().getFullYear()} BUILDING CO. (BEST) L.L.C . All Rights reserved | by <a className="text-white/50 hover:text-white transition-all ease-in-out duration-500" href="https://www.globalsurf.ae/" target="_blank">Global Surf </a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
