"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ContactDetails = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof locations>("Sharjah");

  const locations = {
    Dubai: {
      address: "Al Quoz Industrial Area No. 4, Dubai – United Arab Emirates",
      phone: "+971 4 123 4567",
      email: "dubai@example.com",
      fax: "+971 4 3284399",
      addressCard: "34535",
    },
    Sharjah: {
      address:
        "1st Floor, Faya Business Building, Al Majaz Northern Park St., Al Majaz 2, Sharjah – UAE",
      phone: "+971 6 987 6543",
      email: "sharjah@example.com",
      fax: "+971 4 3284399",
      addressCard: "34535",
    },
    AbuDhabi: {
      address:
        "Office 1814, 18th Floor, Najda Street, Al Khazana Tower, Abu Dhabi, United Arab Emirates",
      phone: "+971 2 345 6789",
      email: "abudhabi@example.com",
      fax: "+971 4 3284399",
      addressCard: "34535",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
      className="col-span-4">
      <div className="flex space-x-5 mb-3 lg:mb-[20px]">
        {Object.keys(locations).map((city) => (
          <button
            key={city}
            className={`flex items-center gap-2 text-[16px] uppercase ${
              activeTab === city ? "text-black" : "bg-transparent text-black"
            }`}
            onClick={() => setActiveTab(city as keyof typeof locations)}>
            <div
              className={`w-[5px] h-[5px] rounded-full ${
                activeTab === city ? "bg-primary" : "bg-white/50"
              }`}></div>
            {city}
          </button>
        ))}
      </div>
      <div className="grid  xl:grid-cols-2 gap-[32px] items-center mt-5 lg:mt-[60px]">
        <div>
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/phone.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="text-[16px] text-black/50">Phone</span>
          </div>
          <p className="text-sm lg:w-[75%]">{locations[activeTab].phone}</p>
        </div>
        <div>
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/fax.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="text-[16px] text-black/50">Fax</span>
          </div>
          <p className="text-sm lg:w-[75%]">{locations[activeTab].fax}</p>
        </div>
        <div>
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/mail.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="text-[16px] text-black/50">Mail</span>
          </div>
          <p className="text-sm lg:w-[75%]">
            {" "}
            <a
              href={`mailto:${locations[activeTab].email}`}
              className="text-primary">
              {locations[activeTab].email}
            </a>
          </p>
        </div>
        <div>
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/addressCard.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="text-[16px] text-black/50">Address Card</span>
          </div>
          <p className="text-sm lg:w-[75%]">
            {locations[activeTab].addressCard}
          </p>
        </div>
        <div>
          <div className="flex gap-2">
            <Image
              src="/assets/img/contact/location.svg"
              alt=""
              width={15}
              height={15}
            />
            <span className="text-[16px] text-black/50">Address</span>
          </div>
          <p className="text-sm lg:w-[75%]">{locations[activeTab].address}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetails;
