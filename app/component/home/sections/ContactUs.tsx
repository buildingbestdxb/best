'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import Image from 'next/image';


const ContactUs = () => {
  return (
    <div>
         <section className="py-16 md:px-12 relative overflow-hidden">
        <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
            <Image src="/assets/img/home/CONTACT.jpg" alt="" width={1920} height={800}/>
        </figure>
      <div className="container">
        <div className="flex items-center space-x-2 text-orange-500 text-sm font-medium">
          <span className="w-8 h-[2px] bg-orange-500"></span>
          <span>CONTACT</span>
        </div>

        <div className="grid md:grid-cols-2 gap-[10px] items-start mt-6">
          <div>
            <h2 className="text-lg font-bold uppercase">
            CONTACT US
            </h2>
            <p>Reach out to us to discuss your project needs and discover how Safe Tech can deliver the perfect solution</p>
          </div>
          <div>
            <div className="backdrop-blur-[10px] bg-black/50 text-white rounded-custom overflow-hidden text-left p-[40px]">
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input className='bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80' type="text" placeholder="Name" required />
                  <input className='bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80' type="email" placeholder="Email" required />
                </div>
                <div className="grid grid-cols-1 gap-4">
                <input  className='bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80' type="tel" placeholder="Phone" required />
                <textarea placeholder="Message" rows={4} required className='bg-transparent border-b-[1px] border-white/20 h-[150px] text-white placeholder:text-white/80' />
                </div>
                <Button type="submit" className="w-full bg-orange-500 text-white hover:bg-orange-600">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default ContactUs