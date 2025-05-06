"use client"

import React from "react";
import parse from 'html-react-parser'
// import ButtonWithIcon from "../common/Buttons/ButtonWithIcon";

interface CareerData {
  data:{
    title:string
    location:string
    department:string
    experience:string
    type:string
    description:string
  }
}

export default function Index({data}:{data:CareerData}) {



  return (
    <>
  <section className="my-[30px] md:my-[40px] lg:my-[60px]">
  <div className="container">
        <div className="b   p-6">
            <h1 className="text-lg text-black font-bold    uppercase">{data?.data.title}</h1>
            <p className="text-gray-600 text-md  mb-3">{data?.data.location}</p>
            <p className="text-gray-500 text-sm">Department: <span className="font-semibold">{data?.data.department}</span></p>
            <p className="text-gray-500 text-sm">Experience Required: <span className="font-semibold">{data?.data.experience}</span></p>
            <p className="text-gray-500 text-sm">Employment Type: <span className="font-semibold">{data?.data.type}</span></p>

            {/* <h2 className="text-2xl font-semibold mt-6 text-black">Job Summary</h2>
            <p className="text-gray-600 mt-2">We are seeking an experienced and highly organized Procurement Manager to lead the procurement and purchasing functions across our projects and head office. The ideal candidate should have a solid background in construction procurement, strong negotiation skills, and the ability to manage vendors, contracts, and strategic sourcing.</p>

            <h2 className="text-2xl font-semibold mt-6 text-black">Key Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Develop and execute procurement strategies that align with project timelines and budgets.</li>
                <li>Oversee end-to-end purchasing processes for materials, assets, equipment, and services.
                </li>
                <li>Build and maintain strong relationships with suppliers, subcontractors, and vendors.</li>
                <li>Ensure timely delivery of materials across projects through efficient coordination.</li>
                <li>    Negotiate contracts and manage supplier performance and pricing.</li>
                <li>Collaborate with Estimation, Planning, Technical, and Cost Control departments.</li>
                <li>Maintain procurement records and ensure compliance with internal policies.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 text-black">Preferred Qualifications</h2>
            <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Bachelor’s Degree in Civil Engineering</li>
                <li>Minimum 15 years of experience,</li>
                <li>Experience in UAE market (materials, suppliers, subcontractors)</li>
                <li>Proficient in ERP systems and Microsoft Office tools</li>
                <li>Strong leadership, communication, and decision-making skills</li>
            </ul> */}
            <div className="mt-6 jobdesc">
              {parse(data?.data.description)}
            </div>

            {/* <div className="mt-8">


              <ButtonWithIcon link={'#'} buttonText="Apply Now" />
            </div> */}
        </div>
        </div>
        </section>
    </>
  );
}
