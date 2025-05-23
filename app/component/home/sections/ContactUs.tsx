"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import parse from 'html-react-parser'
import { HomeType } from "@/app/types/HomeType";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormHome } from "@/app/schemas/contactForm";


interface Values {
  name:string;
  email: string;
  subject: string;
  phone:string;
  message: string;
}


const ContactUs = ({data}:{
  data:HomeType
}) => {

  const {
            register,
            reset,
            handleSubmit,
            formState: {errors},
        } = useForm<Values>({resolver:zodResolver(contactFormHome)});

        const [submitting,setIsSubmitting] = useState(false)

        const onSubmit = async(data:Values) =>{
          console.log("called")
          try {
           setIsSubmitting(true)
           const response = await fetch('/api/admin/contact/enquiry',{
             method:"POST",
             body:JSON.stringify(data)
           })
           if(response.ok){
             const data = await response.json()
             alert(data.message)
             reset()
           }
          } catch (error) {
           console.log("Error submitting form",error)
          }finally{
           setIsSubmitting(false)
          }
         }


  return (
    <div>
      <section className="section-spacing relative overflow-hidden">
        <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
          <Image
            src="/assets/img/home/CONTACT.jpg"
            className="absolute object-cover object-center h-full"
            alt=""
            width={1920}
            height={800}
          />
        </figure>
        <div className="container">
          {/* Section Header with Animation */}
          <motion.div
            className="flex items-center space-x-[24px] text-primary text-sm font-medium mb-5 lg:mb-[60px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }} // Animation resets on scroll
          >
            <span className="w-[24px] h-[2px] bg-primary"></span>
            <span className="w-[130px] leading-none uppercase text-[16px]">
              CONTACT
            </span>
            <hr className="w-[100%]" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-[10px] items-start mt-6">
            <div>
              {/* Title with Animation */}
              <motion.h2
                className="text-lg font-bold uppercase mb-3 lg:mb-[30px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }} // Animation resets on scroll
              >
                CONTACT US
              </motion.h2>
              {/* <motion.p
                className="text-black/75 lg:w-[75%]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }} // Animation resets on scroll
              >
                Let&apos;s build something exceptional together. Reach out to
                Building Co. (BEST) L.L.C to discuss your project needs, explore
                our construction solutions, and experience excellence in every
                detail. Our team is ready to assist you with expert guidance and
                tailored services across the UAE.
              </motion.p> */}

            <motion.div
                className="text-black/75 lg:w-[75%]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }} // Animation resets on scroll
              >
                {parse(data?.data[0].contact || "")}
              </motion.div>

            </div>
            <div>
              <div className="backdrop-blur-[10px] bg-black/50 text-white rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px]">
                <motion.h2
                  className="text-lg font-bold uppercase mb-3 lg:mb-[20px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }} // Animation resets on scroll
                >
                  Get in Touch
                </motion.h2>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                    <motion.input
                      className="bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80 focus:outline-none"
                      type="text"
                      placeholder="Name"
                      {...register("name")}
                      required
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: false }} // Animation resets on scroll
                    />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col">
                    <motion.input
                      className="bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80 focus:outline-none"
                      type="text"
                      placeholder="Email"
                      {...register("email")}
                      required
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: false }} // Animation resets on scroll
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col">
                    <motion.input
                      className="bg-transparent border-b-[1px] border-white/20 h-[50px] text-white placeholder:text-white/80 focus:outline-none"
                      type="text"
                      placeholder="Phone"
                      {...register("phone")}
                      required
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: false }} // Animation resets on scroll
                    />
                    {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <motion.textarea
                      placeholder="Message"
                      {...register("message")}
                      rows={4}
                      required
                      className="bg-transparent border-b-[1px] border-white/20 h-[150px] text-white placeholder:text-white/80 focus:outline-none"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }} // Animation resets on scroll
                    />
                    {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                  </div>
                  <button
                  disabled={submitting}
                    type="submit"
                    className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn whts">
                    <div>
                      <Image
                        src={"/assets/img/icons/arrow.svg"}
                        alt=""
                        width={30}
                        height={30}
                      />
                    </div>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
