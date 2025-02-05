"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    id: 1,
    type: "video",
    videoSrc: "/assets/video/banner.mp4", // Replace with your video path
    poster: "/assets/img/banner.jpg", // Poster image
    title: "BUILDING EXCELLENCE",
    subtitle: "DELIVERING TRUST",
  },
  {
    id: 2,
    type: "image",
    imageSrc: "/assets/img/slide2.jpg",
    title: "INNOVATING THE FUTURE",
    subtitle: "BUILDING LANDMARKS",
 
  }
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
       modules={[Autoplay, Pagination]}
       autoplay={{ delay: 555000, disableOnInteraction: false }}
       pagination={{
         el: ".custom-pagination",
         clickable: true,
         renderBullet: (index, className) =>
           `<span class="custom-bullet ${className}">
               ${(index + 1).toString().padStart(2, "0")}
               <hr class="progress-bar"></hr>
            </span>`,
       }}
       loop={true}
       className="h-full"
       onSlideChange={(swiper) => {
         setActiveIndex(swiper.realIndex);
         document.querySelectorAll(".progress-bar").forEach((el) => {
           (el as HTMLElement).style.animation = "none"; // Reset animation
           void (el as HTMLElement).offsetWidth; // Trigger reflow
           (el as HTMLElement).style.animation = "progress 5s linear forwards"; // Restart animation
         });
     
         if (swiper.realIndex === 0 && videoRef.current) {
           videoRef.current.play();
         } else if (videoRef.current) {
           videoRef.current.pause();
           videoRef.current.currentTime = 0;
         }
       }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <div className="overlay absolute w-full h-full bg-black opacity-50 z-[1]"></div>
              {/* Video Slide with Poster */}
              {slide.type === "video" ? (
                <video
                  ref={videoRef}
                  src={slide.videoSrc}
                  className="absolute inset-0 w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  poster={slide.poster} // Poster image
                />
              ) : (
                /* Image Slide */
                <Image
                  src={slide.imageSrc ?? "/assets/img/slide2.jpg"}
                  alt="Hero Background"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="brightness-[0.6]"
                />
              )}

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center items-start text-left z-[2]">
               <div className="container">
               <h1 className="text-white text-xxl leading-normal font-">
                  {slide.title}
                </h1>
                <h1 className="text-white text-xxl leading-10 font-black mt-2">
                  {slide.subtitle}
                </h1>
               </div>
              
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Numbered Pagination */}
      <div className="absolute z-10 w-full bottom-[50px]">
          <div className="container">
            <div className="custom-pagination text-white flex space-x-4 "></div>
          </div>
      </div>
    </section>
  );
};

export default HeroSection;
