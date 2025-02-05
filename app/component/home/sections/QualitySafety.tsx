"use client";
import Image from "next/image";
import React from "react";

const QualitySafety = () => {
  return (
    <section className="py-16 md:px-12 relative overflow-hidden">
        <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
            <Image src="/assets/img/home/qsbg.jpg" alt="" width={1920} height={800}/>
        </figure>
      <div className="container">
        <div className="flex items-center space-x-2 text-orange-500 text-sm font-medium">
          <span className="w-8 h-[2px] bg-orange-500"></span>
          <span>Quality & Safety</span>
        </div>

        <div className="grid md:grid-cols-2 gap-[10px] items-start mt-6">
          <div>
            <h2 className="text-lg font-bold text-white uppercase">
              Commitment to Quality & Safety
            </h2>
          </div>
          <div>
            <div className="backdrop-blur-[10px] bg-white/10 text-white rounded-custom overflow-hidden text-left p-8">
              <p>
                At Building Co. (BEST) L.L.C, we prioritize quality and safety
                at every stage of construction. Our projects comply with
                international standards, ensuring durability, reliability, and a
                safe work environment. With ISO 9001 (Quality Management), ISO
                14001 (Environmental Management), and ISO 45001 (Occupational
                Health & Safety Management) certifications, we guarantee
                excellence in every project we deliver
              </p>
              <hr className="mt-8 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySafety;
