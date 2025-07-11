"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";
import parse from 'html-react-parser'
import { ContactType } from "@/app/types/ContactType";

 

const ContactDetails = () => {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }: { data: ContactType } = useSWR(`/api/admin/contact`, fetcher)


  useEffect(() => {
    // console.log(data) 
  }, [data])


  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index); 
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
      className="">
      <div className="flex mb-3 lg:mb-[20px] pb-[15px] border-b-[1px] border-[#1E1E1E] xl:gap-[40px] lg:gap-[20px] gap-3 h-[50px]">
        {data?.data?.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-2   font-[700] uppercase transition-all ease-in-out duration-300 ${data?.data[activeTab].region === item.region
                ? "text-black xxl:text-[29px] xl:text-[26px] lg:text-[21px] text-[18px]"
                : "bg-transparent text-black/50 xxl:text-[28px] xl:text-[25px] lg:text-[20px] text-[18px]"
              }`}
            onClick={() => handleTabClick(index)}>
            <div
              className={`w-[10px]  h-[10px] rounded-full ${data?.data[activeTab].region === item.region ? "bg-primary" : "bg-black/30"
                }`}></div>
            {item.region}
          </button>
        ))}
      </div>
      <div className="grid  lg:grid-cols-2 gap-4   items-center ">
        {data?.data[activeTab].phone !== "" && <div className="mt-3">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/phone.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Phone
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px]  text-black font-[500] mt-3 xl:w-[80%]">
            {data?.data[activeTab].phone}
          </p>
        </div>}
        {data?.data[activeTab].fax !== "" && <div className="mt-3">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/fax.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Fax
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px] ">
            {data?.data[activeTab].fax}
          </p>
        </div>}
        {data?.data[activeTab].mail !== "" && <div className="mt-3 ">
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/mail.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Mail
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px] pr-3">
            {/* <a
              href={`mailto:${locations[activeTab].email}`}
              className="text-primary"> */}
            {data?.data[activeTab].mail}
            {/* </a> */}
          </p>
        </div>}
        {data?.data[activeTab].address_card !== "" && <div>
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/addresscard.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
              Address Card
            </span>
          </div>
          <p className="lg:text-[22px] text-[16px] text-black font-[500] mt-2 xl:w-[75%] ">
            {data?.data[activeTab].address_card}
          </p>
        </div>}
      </div>
      {data?.data[activeTab].address !== "" && <div className=" lg:mb-0 mb-9 mt-5">
        <div className="flex gap-2">
          <Image
            src="/assets/img/contact/location.svg"
            alt=""
            width={15}
            height={15}
          />
          <span className="md:text-[16px] text-[14px] text-black/50 font-[800] uppercase">
            Address
          </span>
        </div>
        <div className="lg:text-[22px] text-[16px] text-black font-[500] mt-[16px]  addrea">
          {parse(data?.data[activeTab].address || "")}

        </div>
        
        <div className="w-full h-[300px] lg:h-[310px] rounded-xl overflow-hidden mt-10">
            <iframe
              src={data?.data[activeTab].map}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
 
          </div>
      </div>}
    </motion.div>
  );
};

export default ContactDetails;
