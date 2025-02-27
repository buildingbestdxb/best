"use client"

import React from 'react'
import { motion } from "framer-motion";
import coverImage from '@/public/assets/img/news-details/Frame 51.jpg'
import Image from 'next/image';

const NewsDetails = () => {

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      };


  return (
    <div className='container'>
        <motion.p
            variants={textVariants}
            className="text-white/50 lg:pt-[160px] pt-[100px] text-[16px] font- uppercase"
            style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
            Home / News Details
            <span
              className="font-bold text-primary"
              style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
              {" "}
              Test
            </span>
          </motion.p>
          
          <section className='flex flex-col gap-10'>
            
            <h1 className='text-[50px] font-[900]'>ECC’s Wellbeing Program: How Employees Can Enhance Focus And Relaxation With Vocal Toning</h1>
            <Image src={coverImage} alt='cover-image'/>
            
            <div className='grid grid-cols-5'>
                <div className='p-20 bg-[#F2F2F2] col-span-2 rounded-xl'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-6'>
                            <label className='text-[#FE6601] uppercase font-[800]'>POSTED ON</label>
                            <p>14 Nov 2024</p>
                            <div><hr></hr></div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <label className='text-[#FE6601] uppercase font-[800]'>TAGS</label>
                            <p>14 Nov 2024</p>
                            <div><hr></hr></div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='uppercase font-[800] text-[#FE6601]'>Share article</div>
                        </div>
                    </div>
                </div>
            </div>
          
          </section>
          
    </div>
  )
}


export default NewsDetails

