'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <div className="inline-block">
          <Image src="/Logo.svg" alt="" width={150} height={80}/>
          </div>
          <div className="flex space-x-3 mt-4">
            <FaFacebook className="text-2xl cursor-pointer" />
            <FaLinkedin className="text-2xl cursor-pointer" />
            <FaInstagram className="text-2xl cursor-pointer" />
            <FaYoutube className="text-2xl cursor-pointer" />
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-orange-500">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-orange-500">Projects</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500">Contact Us</Link></li>
          </ul>
        </div>
        
        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <p>Phone: <a href="tel:+97165610999" className="text-orange-500">+971 6 5610999</a></p>
          <p>Fax: <a href="tel:+97165610055" className="text-orange-500">+971 6 5610055</a></p>
          <p>Email: <a href="mailto:info@bestbcc.com" className="text-orange-500">info@bestbcc.com</a></p>
        </div>
        
        {/* Address & Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Address</h3>
          <p>Al Quoz Industrial Area No. 4, Dubai, UAE</p>
          <h3 className="font-semibold text-lg mt-4 mb-3">Newsletter</h3>
          <div className="flex border border-gray-600 rounded-lg overflow-hidden">
            <input type="email" placeholder="Email" className="bg-black text-white px-3 py-2 flex-1 focus:outline-none" />
            <button className="bg-orange-500 px-4 py-2">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} BEST LLC. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer