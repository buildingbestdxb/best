"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageCarousel({ data }: { data: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg w-full lg:h-[571px] h-full aspect-video">

      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full w-full"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          width: `${data.length * 100}%`,
        }}
      >
        {data.map((img, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover h-full w-full"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgb(0 0 0 / 69%) 0%, rgb(0 0 0 / 0%) 75%, rgb(0 0 0 / 0%) 0%)",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Navigation */}
     

      {/* Thumbnails */}
      <div className="absolute bottom-[32px] left-1/2 transform -translate-x-1/2 flex gap-2 backdrop-blur-[24px] bg-[#0E3F7E]/4 p-[12px] rounded-[16px]">
      <button
        className="me-3 left-4 bottom-[32px] backdrop-blur-[10px] bg-[#435368]  text-primary p-[20px] rounded-[16px]"
        onClick={handlePrev}
      >
        <Image
          src="/assets/img/projects-details/next-icn.svg"
          alt="Previous"
          width={18}
          height={18}
        />
      </button>

      
        {data.map((img, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer rounded-[8px] overflow-hidden border-2 w-[54px] h-[54px] ${
              index === activeIndex ? "border-[#FE6601]" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={40}
              className="object-cover h-full"
            />
          </div>
        ))}
        <button
        className=" ms-3 right-4 bottom-[32px] backdrop-blur-[10px] bg-[#435368]  text-primary p-[20px] rounded-[16px]"
        onClick={handleNext}
      >
        <Image
          src="/assets/img/projects-details/prev-icn.svg"
          alt="Next"
          width={18}
          height={18}
        />
      </button>
      </div>
    </div>
  );
}
