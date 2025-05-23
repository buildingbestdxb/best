"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    type: "video",
    videoSrc: "/assets/video/banner.mp4", // Replace with your video path
    poster: "/assets/img/banner.jpg", // Poster image
    title: "BUILDING EXCELLENCE",
    subtitle: "DELIVERING TRUST",
    imageSrc: "/assets/img/slide1.jpg", // Add imageSrc property
  },
  {
    id: 2,
    type: "video",
    videoSrc: "/assets/video/banner-2.mp4",
    poster: "/assets/img/banner.jpg",
    title: "BUILDING EXCELLENCE",
    subtitle: "DELIVERING TRUST",
    imageSrc: "/assets/img/slide2.jpg", // Add imageSrc property
  },
];

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 }, // Delay between child elements
    },
  };

  // Child Elements Animation
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, slides.length);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
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
          document.querySelectorAll(".progress-bar").forEach((el) => {
            (el as HTMLElement).style.animation = "none"; // Reset animation
            void (el as HTMLElement).offsetWidth; // Trigger reflow
            (el as HTMLElement).style.animation =
              "progress 10s linear forwards"; // Restart animation
          });

          videoRefs.current.forEach((video, index) => {
            if (video) {
              if (swiper.realIndex === index) {
                video.play();
              } else {
                video.pause();
                video.currentTime = 0;
              }
            }
          });
        }}>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <div className="overlay absolute w-full h-full bg-black opacity-50 z-[1]"></div>
              {/* Video Slide with Poster */}
              {slide.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
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
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariants}
                className="absolute inset-0 flex flex-col justify-center items-start text-left z-[2] lg:top-[10%]">
                <div className="container">
                  <motion.p
                    variants={textVariants}
                    className="text-white text-xxl leading-none font-light">
                    {slide.title}
                  </motion.p>
                  <motion.p
                    variants={textVariants}
                    className="text-white text-xxl leading-none font-black">
                    {slide.subtitle}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Numbered Pagination */}
      <div className="absolute z-20 w-full bottom-[100px]">
        <div className="container relative">
          <div className="custom-pagination text-white flex space-x-6 "></div>
        </div>
      </div>
      <div className="lg:absolute z-10 w-full bottom-[100px]">
        <div className="container relative">
          <div className="flex justify-end items-end">
            <div className="w-[450px] bg-white/10 backdrop-blur-[10px] text-white p-[40px] rounded-custom">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                pagination={{
                  el: ".custom-pag",
                  clickable: true,
                }}
                loop={true}
                className=" ">
                <SwiperSlide>
                  <div className="space-y-6 text-center flex flex-col items-center">
                    <Image
                      src={"/assets/img/icons/excellence.svg"}
                      alt=""
                      width={34}
                      height={34}
                    />
                    <h3 className="text-center text-[22px]">
                      50 Years of Excellence in the UAE Construction Industry
                    </h3>
                  </div>
                </SwiperSlide>
                
              </Swiper>
            {/*   <div className="custom-pag text-white flex space-x-3 justify-center mt-5"></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
