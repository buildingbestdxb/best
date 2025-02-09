"use client";

import {
  HoveredLink,
  Menu,
  MenuItem,
} from "@/components/ui/navbar-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import { menuItems } from "./data";

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevents errors during SSR

    const handleScreenCheck = () => {
      if (window.innerWidth < 991) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleScreenCheck(); // Set initial state

    window.addEventListener("resize", handleScreenCheck);

    return () => window.removeEventListener("resize", handleScreenCheck);
  }, []);

  if (isMobile) {
    return <MobileNav />;
  } else if (isMobile == null) {
    return null;
  } else {
    return (
      <header className="w-full bg-white/80 backdrop-blur-[10px] shadow-md  absolute top-0 z-10">
       
          {/* <div className='flex items-center'>
   <div className="hidden md:flex space-x-6 text-gray-800 text-sm uppercase">
     <Link href="/about">
       <span className="text-sm">About Us</span>
     </Link>
     <div className="relative group">
       <span className="text-sm">Projects <FaChevronDown /></span>
       <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg p-2 mt-1 rounded-md">
         <Link href="/projects/residential">
           <span className="block px-4 py-2 hover:bg-gray-100">Residential</span>
         </Link>
         <Link href="/projects/commercial">
           <span className="block px-4 py-2 hover:bg-gray-100">Commercial</span>
         </Link>
       </div>
     </div>
     <Link href="/careers">
       <span className="text-sm">Careers</span>
     </Link>
     <Link href="/media">
       <span className="text-sm">Media</span>
     </Link>
     <div className="relative group">
       <span className="text-sm">How We Work <FaChevronDown /></span>
       <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg p-2 mt-1 rounded-md">
         <Link href="/how-we-work/approach">
           <span className="block px-4 py-2 hover:bg-gray-100">Our Approach</span>
         </Link>
         <Link href="/how-we-work/process">
           <span className="block px-4 py-2 hover:bg-gray-100">Process</span>
         </Link>
       </div>
     </div>
   </div>

   
   <Link href="/contact">
     <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
       Contact Us
     </button>
   </Link>
   </div> */}

          <Menu setActive={setActive}>
            {menuItems.map((menuItem, index) =>
              menuItem.children ? (
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item={menuItem.title}
                  key={index}
                >
                  <div className="grid grid-cols-1 gap-4 p-4" >
                    {/* <ProductItem
                  title="Residential"
                  description=" "
                  href="#"
                  src={"/assets/images/gd-im1.jpg"}
                />
                <ProductItem
                  title="Commercial"
                  description=""
                  href="#"
                  src="/assets/images/gd-im2.jpg"
                /> */}
                    {menuItem.children.map((item, index) => (
                      <HoveredLink href="#" key={index}>
                        <div>{item.title}</div>
                      </HoveredLink>
                    ))}

                    {/* <HoveredLink href="#">
                  <div>Commercial</div>
                </HoveredLink> */}
                  </div>
                </MenuItem>
              ) : (
                <MenuItem
                  item={menuItem.title}
                  setActive={setActive}
                  active={active}
                  noMenu
                  key={index}
                >
                  <div className="p-4">
                    <Link href="/">{menuItem.title}</Link>
                  </div>
                </MenuItem>
              )
            )}

            {/* <MenuItem item="About Us" setActive={setActive} active={active}>
             <div className="p-4">
               <Link href="/">About Us</Link>
             </div>
           </MenuItem> */}

            {/* <MenuItem setActive={setActive} active={active} item="Projects">
             <div className="grid grid-cols-2 gap-4 p-4">
               <ProductItem
                 title="Residential"
                 description=" "
                 href="#"
                 src={"/assets/images/gd-im1.jpg"}
               />
               <ProductItem
                 title="Commercial"
                 description=""
                 href="#"
                 src="/assets/images/gd-im2.jpg"
               />
               <HoveredLink href="#">
                 <div>Residential</div>
               </HoveredLink>
               <HoveredLink href="#">
                 <div>Commercial</div>
               </HoveredLink>
             </div>
           </MenuItem>

           <MenuItem item="Careers" setActive={setActive} active={active} noMenu>
             <div className="p-4">
               <Link href="/">Careers</Link>
             </div>
           </MenuItem>

           <MenuItem item="Media" setActive={setActive} active={active}>
             <div className="p-4">
               <Link href="/">Media</Link>
             </div>
           </MenuItem>

           <MenuItem item="How we work" setActive={setActive} active={active}>
             <div className="p-4">
               <Link href="/">How we work</Link>
             </div>
           </MenuItem> */}
        
          </Menu>
      </header>
    );
  }
};

export default Navbar;
