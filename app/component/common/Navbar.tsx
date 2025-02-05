import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaChevronDown } from "react-icons/fa";
const Navbar = () => {
  return (
  
         <nav className="w-full bg-white/80 backdrop-blur-[10px] shadow-md py-4 absolute top-0 z-10">
         <div className="container mx-auto flex items-center justify-between">

           
      <div className="flex items-center">
        <Image src="/Logo.svg" alt="Crest Logo" width={80} height={50} className='h-[50px] w-auto' />
      </div>

        <div className='flex items-center'>
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

      {/* Contact Button */}
      <Link href="/contact">
        <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
          Contact Us
        </button>
      </Link>
      </div>
      </div>
      
    </nav>
   
  )
}

export default Navbar