"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { contactForm } from "@/app/schemas/contactForm";

interface Values {
  name:string;
  email: string;
  subject: string;
  message: string;
}


const Form = () => {

      const {
          register,
          reset,
          handleSubmit,
          formState: {errors},
      } = useForm<Values>({resolver:zodResolver(contactForm)});

      const [submitting,setIsSubmitting] = useState(false)

      const onSubmit = async(data:Values) =>{
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
    <div className=" relative overflow-hidden h-full">
      <div className="container p-0 h-full">
        {/* Section Header with Animation */}

        <div className="h-full">
          <div className=" bg-black/5 text-black rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px] h-full">
            <motion.h2
              className="md:text-lg text-[18px] font-bold uppercase mb-3 lg:mb-[20px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="lg:text-[18px] text-[16px] text-black/75 mb-3 lg:mb-[40px] lg:w-[72%] leading-[25.2px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              Reach out to us to discuss your project needs and discover how
              Best can deliver the perfect solution
            </motion.p>
            <form className="flex flex-col gap-[32px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div className="grid grid-cols-1 gap-4 ">
                <motion.input
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  placeholder="Subject"
                  {...register("subject")}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
              </div>
              <div className="grid grid-cols-1 gap-4 ">
                <motion.textarea
                  placeholder="Message"
                  rows={4}
                  {...register("message")}
                  className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[150px] text-black/50 placeholder:text-black/50 focus:outline-none"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }} // Animation resets on scroll
                />
                {errors.message && <span className="text-red-500">{errors.message.message}</span>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="self-start text-white bg-primary rounded-lg text-sm font-medium transition uppercase spckbtn orng">
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
  );
};

export default Form;
