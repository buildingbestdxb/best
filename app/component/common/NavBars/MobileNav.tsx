import React, { useState } from "react";
import { menuItems } from "./data";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";

const MobileNav = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-transparent text-white tanspheader py-4 absolute top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/Logo.svg"
                alt="Crest Logo"
                width={80}
                height={50}
                className="h-[50px] w-auto"
              />
              
            <p className="text-[14px] font-[500] mt-1 text-center ">Building Co. BEST L.L.C</p>
            </Link>
          </div>
          {/* Hamburger Button */}
          <div
            className="cursor-pointer px-3 py-6"
            onClick={() => setMenuOpen(!menuOpen)}>
            <div
              className={`relative block h-[2px] w-7 bg-primary transition-all
                before:absolute before:top-[-0.35rem] before:block before:h-full before:w-full before:bg-primary before:transition-all
                after:absolute after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-primary after:transition-all
                ${
                  menuOpen
                    ? "bg-transparent before:rotate-45 before:top-0 after:-rotate-45 after:bottom-0"
                    : ""
                }`}></div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)} // Clicking outside closes menu
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-500
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="min-h-full px-6 pt-[30px] pb-[40px] flex flex-col relative">
          {/* Close Button */}
          <button
            className="absolute top-8 right-4 text-[25px] text-primary font-600"
            onClick={() => setMenuOpen(false)}>
            ✕
          </button>

          {/* Logo */}
          <div className="text-left mb-[50px]">
            <Link href="/">
              <Image
                src="/Logo.svg"
                alt="Crest Logo"
                width={80}
                height={50}
                className="h-[50px] w-auto"
              />
              <p className="text-[14px] font-[500] mt-1 text-center w-[182px] ">Building Co. BEST L.L.C</p>
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="flex flex-col gap-4">
            {menuItems.map((item, index) =>
              item.children && item.children.length > 0 ? (
                <li key={index}>
                  <div
                    className="pb-2 flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }>
                    <span className="font-semibold">{item.title}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {/* Dropdown */}
                  {activeDropdown === index && (
                    <ul className="">
                      {item.children.map(
                        (
                          childItem: { url: string; title: string },
                          childIndex
                        ) => (
                          <li key={childIndex} className="py-1">
                            <Link
                              href={childItem.url}
                              onClick={() => setMenuOpen(false)}>
                              {childItem.title}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index} className="pb-2">
                  <Link
                    href={item.url}
                    onClick={() => setMenuOpen(false)}
                    className="font-semibold">
                    {item.title}
                  </Link>
                </li>
              )
            )}

            {/* Contact Link */}
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="font-semibold">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-auto">
            <hr />
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaLinkedinIn className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaInstagram className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
              <FaYoutube className="cursor-pointer w-6 h-6 hover:text-primary transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
