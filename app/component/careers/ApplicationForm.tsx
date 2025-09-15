"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { careerForm } from "@/app/schemas/careerForm";
import { sendMailToJobSeeker } from "@/app/actions/sendMailToJobSeeker";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  cityandcountry:string;
  gender: string;
  dob: string;
  experience: string;
  experienceinconstruction:string;
  experienceinuae:string;
  currentposition:string;
  currentemployer:string;
  currentsalary:string;
  expectedsalary:string;
  noticeperiod:string;
  hasrelative:string;
  relativeName:string;
  haspreviouswork:string;
  hasresponsibilities:string;
  softwares: string;
  companyType:string;
  skills: string;
  resume: string;
  coverLetter: string;
  linkedinProfile:string;
}

export default function ApplicationForm({data:fetchedData}:{data:{data:{title:string,responsibilities:string[]}}}) {

  const { register, setValue, formState: { errors,isSubmitting }, handleSubmit, setError, reset, control,watch} = useForm<FormData>({ resolver: zodResolver(careerForm) })
  const [choosenFile, setChoosenFile] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState<File | null>(null)

  console.log("errors",errors)
  const onSubmit = async (typedData: FormData) => {
    console.log("typedData",typedData)
    try {
      const formData = new FormData();
      formData.append("file", choosenFile || "");
      formData.append("fileType", "file");
      const responseAfterUpload = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      let coverLetterData = null;
      if(coverLetter){
        const coverLetterFormData = new FormData();
        coverLetterFormData.append("file", coverLetter || "");
        coverLetterFormData.append("fileType", "coverLetter");
        const coverLetterResponseAfterUpload = await fetch("/api/admin/upload", {
          method: "POST",
          body: coverLetterFormData,
        });
        if (coverLetterResponseAfterUpload.status !== 200) {
          alert("Failed to submit form")
          return;
        } else {
          coverLetterData = await coverLetterResponseAfterUpload.json()
          console.log("coverLetterUrl", coverLetterData.url)
          setValue("coverLetter", coverLetterData.url)
        }
      }

      if (responseAfterUpload.status !== 200) {
        alert("Failed to submit form")
        return;
      } else {
        const data = await responseAfterUpload.json()
        console.log("url", data.url)
        console.log("title",fetchedData.data.title)
        const response = await fetch("/api/admin/careers/request", {
          method: "POST",
          body: JSON.stringify({ ...typedData, resume: data.url,appliedFor:fetchedData.data.title,coverLetter:coverLetterData?.url }),
        });

        if (response.ok) {
          alert("Thank you, we will reach out to you soon")
          sendMailToJobSeeker(typedData.fullName,typedData.email)
        } else {
          alert("Failed to submit form after upload")
        }
      }
    } catch (error) {
      console.log("Error submitting form on careers,", error)
    } finally {
      setChoosenFile(null)
      reset()
    }
  }

  const handleImageChoose = (file: File | null) => {
    if (file?.type !== "application/pdf") {
      setError("resume", { message: "Provide only PDFs" })
      return;
    }
    setChoosenFile(file)
    setValue("resume", file.name)
  }

  const handleCoverLetterChoose = (file: File | null) => {
    if (file?.type !== "application/pdf") {
      setError("coverLetter", { message: "Provide only PDFs" })
      return;
    }
    setCoverLetter(file)
    setValue("coverLetter", file.name)
  }


  return (
    <div className=" relative overflow-hidden pb-[100px] pbsts">
      <div className="container p-0">
        {/* Section Header with Animation */}

        <div>
          <div className=" bg-black/5 text-black rounded-custom overflow-hidden text-left p-[25px] lg:p-[40px]">
            <motion.h2
              className="lg:text-[32px] text-[25px] font-bold uppercase mb-3 lg:max-w-[55ch]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }} // Animation resets on scroll
            >
              Please complete the form below to apply for the position of {fetchedData?.data.title} at Building Co. BEST LLC. Only shortlisted candidates will be contacted.
            </motion.h2>

            <form className="flex flex-col gap-[32px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div className="underline font-bold">Basic Information</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <motion.input
                      {...register("fullName")}
                      className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                      type="text"
                      placeholder="Full Name"

                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }} // Animation resets on scroll
                    />
                    {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
                  </div>

                  <div className="flex flex-col">
                    <motion.input
                      className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                      type="text"
                      placeholder="Email Address"
                      {...register("email")}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }} // Animation resets on scroll
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                  </div>

                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    type="text"
                    placeholder="Mobile Number"
                    {...register("phone")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Nationality"
                    {...register("nationality")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.nationality && <span className="text-red-500">{errors.nationality.message}</span>}
                </div>

              </div>{" "}
              <div className="grid lg:grid-cols-2 gap-[32px] ">
                {/* Gender Selection */}
                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Current City & Country"
                    {...register("cityandcountry")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.cityandcountry && <span className="text-red-500">{errors.cityandcountry.message}</span>}
                </div>

                <div className="flex flex-col justify-center">
                  <motion.div
                    className="col-span-2 flex gap-6 "
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}>
                    <span className="text-black/50 text-[18px]">Gender:</span>
                    {["Male", "Female"].map((gender) => (
                      <label
                        key={gender}
                        className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={gender.toLowerCase()}
                          className="hidden peer"
                          {...register("gender")}
                        />
                        <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="text-black/50 text-[18px]">
                          {gender}
                        </span>
                      </label>
                    ))}
                  </motion.div>
                  {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
                </div>
              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="relative">
                  <motion.input
                    className=" w-full bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Date of Birth"
                    {...register("dob")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  <input type="date" onChange={(e) => setValue("dob", e.target.value)} className="outline-none top-3 text-transparent w-full left-0 absolute bg-transparent"></input>
                  {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
                </div>

              </div>

              <div className="underline font-bold">Professional Background</div>

              <div className="grid lg:grid-cols-2 gap-[32px]">
                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Total Years of Experience"
                    {...register("experience")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.experience && <span className="text-red-500">{errors.experience.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Years of experience in construction industry"
                    {...register("experienceinconstruction",{required:true})}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.experienceinconstruction && <span className="text-red-500">{errors.experienceinconstruction.message}</span>}
                </div>

              </div>
              <div className="grid lg:grid-cols-2 gap-[32px]">

                <div className="flex flex-col justify-center">
                  <motion.div
                    className="col-span-2 flex gap-6 "
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}>
                    <span className="text-black/50 text-[18px]">Do you have experience working in UAE or GCC region?</span>
                    {["Yes", "No"].map((experience) => (
                      <label
                        key={experience}
                        className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={experience.toLowerCase()}
                          className="hidden peer"
                          {...register("experienceinuae",{required:true})}
                        />
                        <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="text-black/50 text-[18px]">
                          {experience}
                        </span>
                      </label>
                    ))}
                  </motion.div>
                  {errors.experienceinuae && <span className="text-red-500">{errors.experienceinuae.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Current Position / Job Title"
                    {...register("currentposition")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.currentposition && <span className="text-red-500">{errors.currentposition.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Current Employer"
                    {...register("currentemployer")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.currentemployer && <span className="text-red-500">{errors.currentemployer.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Current Monthly Salary (AED)"
                    {...register("currentsalary")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.currentsalary && <span className="text-red-500">{errors.currentsalary.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Expected Monthly Salary (AED)"
                    {...register("expectedsalary")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.expectedsalary && <span className="text-red-500">{errors.expectedsalary.message}</span>}
                </div>

                <div className="flex flex-col">
                  <motion.input
                    className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                    placeholder="Notice Period / When can you join?"
                    {...register("noticeperiod")}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }} // Animation resets on scroll
                  />
                  {errors.noticeperiod && <span className="text-red-500">{errors.noticeperiod.message}</span>}
                </div>

                <div className="flex flex-col justify-center gap-5">
                  <motion.div
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}>
                    <span className="text-black/50 text-[18px]">Do you have any relatives currently working with Building Co. BEST LLC?</span>
                    {["Yes", "No"].map((experience) => (
                      <label
                        key={experience}
                        className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={experience.toLowerCase()}
                          className="hidden peer"
                          {...register("hasrelative")}
                        />
                        <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="text-black/50 text-[18px]">
                          {experience}
                        </span>
                      </label>
                    ))}

                  </motion.div>
                  {errors.hasrelative && <span className="text-red-500">{errors.hasrelative.message}</span>}
                  
                  {watch("hasrelative") === "yes" && <Controller control={control} name="relativeName" render={({ field }) => (
                    <div>
                      If Yes, please provide name and relationship.
                      <div className="flex flex-col">
                        <motion.input
                          className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                        placeholder="Name and relationship"
                        {...field}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }} // Animation resets on scroll
                      />
                    </div>
                      {errors.relativeName && <span className="text-red-500">{errors.relativeName.message}</span>}
                  </div>
                  )}
                />}
                </div>

              </div>

              <div className="flex flex-col gap-10">
                <div className="underline font-bold">Technical Screening - {fetchedData?.data.title} specific</div>

                <div className="grid grid-cols-1 gap-10">

                  <motion.div
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}>
                    <span className="text-black/50 text-[18px]">Have you previously worked in a similar position?</span>
                    {["Yes", "No"].map((experience) => (
                      <label
                        key={experience}
                        className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={experience.toLowerCase()}
                          className="hidden peer"
                          {...register("haspreviouswork")}
                        />
                        <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="text-black/50 text-[18px]">
                          {experience}
                        </span>
                      </label>
                    ))}



                  </motion.div>
                  {errors.haspreviouswork && <span className="text-red-500">{errors.haspreviouswork.message}</span>}


                  <motion.div
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}>
                    <span className="text-black/50 text-[18px]">Have you handled responsibilities such as {fetchedData?.data.responsibilities.map((item:string,index:number)=>(<span key={index}>{index === fetchedData?.data.responsibilities.length - 1 ? item : item + ", "}</span>))}</span>
                    {["Yes", "No"].map((experience) => (
                      <label
                        key={experience}
                        className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value={experience.toLowerCase()}
                          className="hidden peer"
                          {...register("hasresponsibilities")}
                        />
                        <div className="w-4 h-4 border border-black/20 rounded-full flex items-center justify-center peer-checked:bg-[#FE6601] peer-checked:scale-110  transition-all">
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                        </div>
                        <span className="text-black/50 text-[18px]">
                          {experience}
                        </span>
                      </label>
                    ))}

                  </motion.div>
                  {errors.hasresponsibilities && <span className="text-red-500">{errors.hasresponsibilities.message}</span>}

                  <motion.div>
                  <span className="text-black/50 text-[18px]">What software or systems are you proficient in that are relevant to this role?</span>
                    <div className="flex flex-col">
                      <motion.textarea
                        className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"

                        {...register("softwares")}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }} // Animation resets on scroll
                      />
                      {errors.softwares && <span className="text-red-500">{errors.softwares.message}</span>}
                    </div>
                  </motion.div>

                  <motion.div>
                    <span className="text-black/50 text-[18px]">What type of companies have you worked for?</span>
                    <div className="flex flex-col">
                      <motion.select
                        className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/70 focus:outline-none"
                        {...register("companyType")}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <option value="" disabled selected hidden>Select company type</option>
                        <option value="Main Contractor">Main Contractor</option>
                        <option value="Subcontractor">Subcontractor</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Other">Other</option>
                      </motion.select>
                      {errors.companyType && (
                        <span className="text-red-500">{errors.companyType.message}</span>
                      )}
                    </div>
                  </motion.div>

                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="underline font-bold">Open-Ended Job-Focused Question</div>

                <div className="grid grid-cols-1 gap-10">


                  <motion.div>
                  <span className="text-black/50 text-[18px]">Please describe your experience and skills that make you a strong candidate for the role of {fetchedData?.data.title}<br/>
                  <i className="text-black/50 text-[14px]">You may include relevant projects, challenges you managed, tools or software you used, and key achievements.</i></span>
                    <div className="flex flex-col">
                      <motion.textarea
                        className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"

                        {...register("skills")}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }} // Animation resets on scroll
                      />
                      {errors.skills && <span className="text-red-500">{errors.skills.message}</span>}
                    </div>
                  </motion.div>
                </div>
              </div>

                      <div className="flex flex-col gap-10">
                        <div className="underline font-bold">Final steps</div>
                      <div className="grid grid-cols-1 gap-10">
                        <div className="grid grid-cols-2 gap-10">
                        
                        <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <label
                    htmlFor="resume"
                    className="block  text-black/50 text-[18px] mb-[16px]">
                    Attach your updated CV
                  </label>
                  <div className="bg-black/10 rounded-custom p-3 mt-2 relative">
                    <input
                      id="resume"
                      type="file"
                      className="block w-full text-[16px] text-black/60 file:py-2 file:px-8 file:rounded-lg file:border-0 file:text-[16px] file:bg-black file:text-white hover:file:bg-black/20 pr-[3em]"
                      onChange={(e)=>handleImageChoose(e?.target?.files?.[0] || null)}
                    />
                    
                  </div>
                      {errors.resume && <span className="text-red-500">{errors.resume.message}</span>}
                </motion.div>
                        
                        <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                  <label
                    htmlFor="coverLetter"
                    className="block  text-black/50 text-[18px] mb-[16px]">
                    Cover Letter
                  </label>
                  <div className="bg-black/10 rounded-custom p-3 mt-2 relative">
                    <input
                      id="coverLetter"
                      type="file"
                      className="block w-full text-[16px] text-black/60 file:py-2 file:px-8 file:rounded-lg file:border-0 file:text-[16px] file:bg-black file:text-white hover:file:bg-black/20 pr-[3em]"
                      onChange={(e)=>handleCoverLetterChoose(e?.target?.files?.[0] || null)}
                    />
                    
                  </div>
                      {errors.coverLetter && <span className="text-red-500">{errors.coverLetter.message}</span>}
                </motion.div>
                        </div>

                <motion.div initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}>
                    <div className="flex flex-col">
                      <motion.input
                        className="bg-transparent border-b-[1px] text-[18px] border-black/10 h-[50px] text-black/50 placeholder:text-black/50 focus:outline-none"
                        placeholder="LinkedIn Profile"
                        {...register("linkedinProfile")}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }} // Animation resets on scroll
                      />
                      {errors.linkedinProfile && <span className="text-red-500">{errors.linkedinProfile.message}</span>}
                    </div>
                  </motion.div>




                </div>
                </div>

              <button
                type="submit"
                disabled={isSubmitting}
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
}
