import React from "react";
import { menuItems } from "./data";
import Image from "next/image";
import {  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
const MobileNav = () => {
 /*  const [activeDropdown, setActiveDropdown] = useState<number | null>(null); */

  return (
    <>
      <nav className="w-full bg-white/80 backdrop-blur-[10px] shadow-md py-4 absolute top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/Logo.svg"
              alt="Crest Logo"
              width={80}
              height={50}
              className="h-[50px] w-auto"
            />
          </div>
        </div>
      </nav>
      <label
        className="absolute top-4 right-4 z-50 cursor-pointer px-3 py-6"
        htmlFor="mobile-menu"
      >
        <input className="peer hidden" type="checkbox" id="mobile-menu" />
        <div
          className="relative z-50 block h-[2px] w-7 bg-primary content-[''] 
                 before:absolute before:top-[-0.35rem] before:block before:h-full before:w-full before:bg-primary before:transition-all before:duration-200 before:ease-out before:content-[''] 
                 after:absolute after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-primary after:transition-all after:duration-200 after:ease-out after:content-[''] 
                 peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform 
                 after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"
        ></div>

        {/* Overlay */}
        <div className="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-sm peer-checked:block"></div>

        {/* Sliding Menu */}
        <div className="fixed top-0 right-0 z-40 h-full w-[350px] translate-x-full overflow-y-auto transition-transform duration-500 peer-checked:translate-x-0 bg-white shadow-2xl w-[300px]">
          <div className="min-h-full px-6 pt-[30px] pb-[40px] flex flex-col align-middle">
            <div className="text-left mb-[50px] ">
          <Image
              src="/Logo.svg"
              alt="Crest Logo"
              width={80}
              height={50}
              className="h-[50px] w-auto"
            />
            </div>
            <ul className="flex flex-col gap-4">
              {menuItems.map((item, index) =>
                item.children ? (
                  <li key={index}>
                    <a href="#" className="font-semibold">{item.title}</a>
                    <ul>
                     {/*  <li onClick={() => setActiveDropdown(index)}>
                        <a href="#">{item.title}</a>
                      </li> */}
                      {/* <ul>
                        {activeDropdown == index &&
                          item.children.map((childItem, index) => (
                            <li key={index} className="pl-2">
                              <a href="#">{childItem.title}</a>
                            </li>
                          ))}
                      </ul> */}
                    </ul>
                  </li>
                ) : (
                  <li key={index}>
                    <a className="font-semibold" href="#">{item.title}</a>
                  </li>
                )
              )}
            </ul>
            <div className="mt-auto">
            <hr />
              <div className="flex ">
             
                        <div className='cursor-pointer w-[45px] h-[45px] rounded-full leading-[50px] flex justify-center items-center hover:text-primary transition-all duration-500 ease-in-out'><FaFacebookF  className="" /></div>
                        <div className='cursor-pointer w-[45px] h-[45px] rounded-full flex justify-center items-center hover:text-primary transition-all duration-500 ease-in-out'><FaLinkedinIn className="" /></div>
                        <div className='cursor-pointer w-[45px] h-[45px] rounded-full flex justify-center items-center hover:text-primary transition-all duration-500 ease-in-out'><FaInstagram className="" /></div>
                        <div className='cursor-pointer w-[45px] h-[45px] rounded-full flex justify-center items-center hover:text-primary transition-all duration-500 ease-in-out'><FaYoutube className="" /></div>
                      </div>
                      </div>
          </div>
        </div>
      </label>
    </>
  );
};

export default MobileNav;
