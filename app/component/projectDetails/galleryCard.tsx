"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageCarousel({
  data,
  activeIndex,
  setActiveIndex,
}: {
  data: string[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl shadow-lg w-full lg:h-[571px] h-[400px] group">
        {/* Slide Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full w-full"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {data.map((img, index) => (
            <div
              key={index}
              className="relative w-full h-full flex-shrink-0"
            >
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

              {/* + Button (appears on hover) */}
             <button
  onClick={() => setIsLightboxOpen(true)}
  className="absolute top-[50%] h-fit inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 top-[50%]"
>
  <span className="bg-white text-black w-14 h-14 pb-1 flex items-center justify-center rounded-full shadow-lg text-3xl font-bold">
    +
  </span>
</button>
            </div>
          ))}
        </div>

        {/* Prev Button */}
        <button
          className="absolute top-[50%] h-fit me-3 left-4 backdrop-blur-[10px] bg-[#435368] hover:bg-[#435368a3] transition-all duration-100 ease-in-out text-primary p-[20px] rounded-[16px] group"
          onClick={handlePrev}
        >
          <Image
            src="/assets/img/projects-details/next-icn.svg"
            alt="Previous"
            width={18}
            height={18}
            className="invert-[1] brightness-[0] min-w-[18px] min-h-[18px] group-hover:brightness-[1] group-hover:invert-[0] transition-all duration-300 ease-in-out"
          />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-[32px] left-1/2 transform -translate-x-1/2 flex gap-2 backdrop-blur-[24px] bg-[#0E3F7E]/4 p-[12px] rounded-[16px]">
          <div className="flex gap-2 max-w-[180px] md:max-w-[400px] lg:max-w-[250px] xl:max-w-[500px] overflow-scroll scrollbar-whide">
            {data.map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-[8px] overflow-hidden border-2 min-w-[54px] h-[54px] ${
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
          </div>
        </div>

        {/* Next Button */}
        <button
          className="absolute top-[50%] h-fit ms-3 right-4 backdrop-blur-[10px] bg-[#435368] hover:bg-[#435368a3] transition-all duration-100 ease-in-out text-primary p-[20px] rounded-[16px] group"
          onClick={handleNext}
        >
          <Image
            src="/assets/img/projects-details/prev-icn.svg"
            alt="Next"
            width={18}
            height={18}
            className="invert-[1] brightness-[0] min-w-[18px] min-h-[18px] group-hover:brightness-[1] group-hover:invert-[0] transition-all duration-300 ease-in-out"
          />
        </button>
      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ✕
          </button>

          {/* Image */}
          <div className="relative w-[90%] h-[80%]">
            <Image
              src={data[activeIndex]}
              alt="Fullscreen"
              fill
              className="object-contain"
            />
          </div>

          {/* Prev & Next in Lightbox */}
          <button
            className="absolute left-6 text-white text-4xl"
            onClick={handlePrev}
          >
            ‹
          </button>
          <button
            className="absolute right-6 text-white text-4xl"
            onClick={handleNext}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
