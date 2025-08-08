"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import arrow from "@/public/assets/img/home/arrow.svg";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  url,
  children,
  noMenu,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  url: string;
  children?: React.ReactNode;
  noMenu?: boolean;
}) => {
  return (
    <div
      onMouseEnter={() => (noMenu ? setActive(null) : setActive(item))}
      className="relative">
      <div className="flex gap-2">
        <Link href={url}>
          <motion.div
            transition={{ duration: 0.3 }}
            className="cursor-pointer font-semibold group-hover:text-opacity-50 dark:text-white uppercase ">
            <div className="flex gap-3 ">{item}</div>
          </motion.div>
        </Link>
        {!noMenu && <Image src={arrow} alt="arrow" className="arrowst" />}
      </div>
      {active !== null && !noMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div className="">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white absolute dark:bg-black backdrop-blur-sm mt-6 overflow-hidden rounded-[8px] dark:border-white/[0.2] shadow-xl">
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full px-3  ">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative border border-transparent dark:bg-black dark:border-white/[0.2] shadow-input flex justify-center space-x-[12px] items-center py-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="Crest Logo"
              width={80}
              height={60}
              className="h-[60px] w-auto"
            />
            <p className="text-[16px] font-[500] mt-2 text-center ">Building Co. BEST L.L.C</p>
          </Link>
        </div>
        <div className="flex space-x-[25px] xl:space-x-[35px] items-center">
          {children}
          <Link
            href="/contact"
            className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn">
            <div>
              <Image
                src={"/assets/img/icons/arrow.svg"}
                alt=""
                width={30}
                height={30}
              />
            </div>{" "}
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: LinkProps & { children: ReactNode }) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black">
      {children}
    </Link>
  );
};
