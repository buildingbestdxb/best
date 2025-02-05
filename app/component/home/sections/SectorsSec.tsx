'use client'
import Image from "next/image";
import React from "react";

const sectors = [
    {
        id: 1,
        title: "Residential",
        icon: "/assets/img/icons/residential.svg",
        poster: "/assets/img/sectors/01.jpg"
    },
    {
        id: 2,
        title: "Commercial",
        icon: "/assets/img/icons/commercial.svg",
        poster: "/assets/img/sectors/02.jpg"
    },
    {
        id: 3,
        title: "Industrial",
        icon: "/assets/img/icons/industrial.svg",
        poster: "/assets/img/sectors/03.jpg"
    },
    {
        id: 4,
        title: "Hospitality",
        icon: "/assets/img/icons/hospitality.svg",
        poster: "/assets/img/sectors/04.jpg"
    },
    {
        id: 5,
        title: "Retail",
        icon: "/assets/img/icons/retail.svg",
        poster: "/assets/img/sectors/05.jpg"
    },
    {
        id: 6,
        title: "Healthcare",
        icon: "/assets/img/icons/health-care.svg",
        poster: "/assets/img/sectors/06.png"
    }
]
const SectorsSec = () => {
  return (
    <section className="section-spacing bg-custom-gray">
      <div className="container">
        <div className="flex items-center space-x-2 text-orange-500 text-sm font-medium">
          <span className="w-8 h-[2px] bg-orange-500"></span>
          <span>Sectors</span>
        </div>
        <div className="w-[50%]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            BUILDING CO. (BEST) L.L.C
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="grid md:grid-cols-6 gap-[10px] items-center mt-6">
            {sectors.map((sector, index) => (
                <div key={index}>
            <div className="relative h-[400px] overflow-hidden rounded-custom shadow-lg">
              <Image
                src={sector.poster}
                alt="Background Image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-x-[10px] bottom-[10px] p-4 backdrop-blur-[10px] bg-white/10 text-white rounded-custom overflow-hidden text-left">
                <Image src={sector.icon} alt="" width={20} height={20}/>
                <h4 className="text-md font-semibold">{sector.title}</h4>
              </div>
            </div>
          </div>
            ))}
          
       
          
        </div>
      </div>
    </section>
  );
};

export default SectorsSec;
