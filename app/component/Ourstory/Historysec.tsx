"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import SecHr from "../common/SecDivider/SecHr";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AboutType } from "@/app/types/AboutType";
import parse from 'html-react-parser'

const Historysec = ({data}:{
  data:AboutType
}) => {
  

  const [activeIndex, setActiveIndex] = useState(0); // 2010 is default active (index 3)
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: data?.data[0].history.length - 1,
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  // Handle responsive visible range
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Small screens - show 2 items: active + 1 next to it (if possible)
        const start = Math.max(0, activeIndex - 1);
        const end = Math.min(data?.data[0].history.length - 1, activeIndex);
        setVisibleRange({ start, end });
      } else if (window.innerWidth < 1024) {
        // Medium screens - show 5 items
        const start = Math.max(0, activeIndex - 2);
        const end = Math.min(data?.data[0].history.length - 1, activeIndex + 1);
        setVisibleRange({ start, end });
      } else {
        // Large screens - show all
        setVisibleRange({ start: 0, end: data?.data[0].history.length - 1 });
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex, data?.data[0].history.length]);

  // Mobile-only scroll to ensure active item is visible
  useEffect(() => {
    if (timelineRef.current && activeIndex >= 0) {
      const timelineItems =
        timelineRef.current.querySelectorAll(".timeline-item");

      if (timelineItems[activeIndex]) {
        const container = timelineRef.current;
        const item = timelineItems[activeIndex];

        // Get the center of the container
        const containerCenter = container.offsetWidth / 2;
        // Get the center of the item relative to the container
        const itemCenter =
          (item as HTMLElement).offsetLeft +
          (item as HTMLElement).offsetWidth / 2;
        // Scroll to center the active item
        const scrollPosition = itemCenter - containerCenter;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  const handleYearClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleScrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (activeIndex < data?.data[0].history.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <section className="section-spacing bg-black/20">
        <div className="container">
          <div className="">
            <div className="mb-4 md:mb-[60px]">
              <SecHr title="Our History" />
            </div>
            <div className="lg:grid lg:grid-cols-12 md:gap-[50px] gap-[20px] lg:gap-[80px] flex flex-col items-center">
              <motion.div
                className="relative w-full h-[300px] col-span-4"
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <Image
                  src={data?.data[0]?.history[activeIndex].image}
                  alt={`history-${data?.data[0].history[activeIndex].year}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              <div className="col-span-8">
                <motion.div
                  className="flex flex-col gap-[12px] lg:gap-[32px]  font-sm leading-[25.3px] text-secondary/75"
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}>
                  <h2 className="text-xxl font-black">
                    {data?.data[0]?.history[activeIndex].year}
                  </h2>
                  <h3 className="text-lg font-black mt-5">
                    {data?.data[0]?.history[activeIndex].title}
                  </h3>
                  {/* {data?.data[0]?.history[activeIndex].content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-sm leading-[25.3px] text-secondary/75">
                      {paragraph}
                    </p>
                  ))} */}
                  {parse(data?.data[0]?.history[activeIndex].content || "")}
                </motion.div>
              </div>
            </div>

            {/* Timeline Navigation */}
            <div className="w-full pt-2 md:pt-[30px] lg:pt-[120px] relative">
              {/* Mobile Navigation Arrows */}

              <div className="flex justify-between md:hidden">
                <button
                  onClick={handleScrollLeft}
                  className={`p-2 rounded-full bg-black/30 text-white absolute top-1/2 left-2 transform -translate-y-1/2 z-10  ${
                    activeIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={activeIndex === 0}>
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={handleScrollRight}
                  className={`p-2 rounded-full bg-black/30 text-white absolute top-1/2 right-2 transform -translate-y-1/2 z-10  ${
                    activeIndex === data?.data[0].history.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={activeIndex === data?.data[0].history.length - 1}>
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Timeline Container - Scrollable on mobile only */}
              <div
                ref={timelineRef}
                className="relative w-full overflow-x-auto md:overflow-x-visible overflow-y-hidden pt-4 md:py-[10px] px-4 flex flex-row no-scrollbar"
                style={{
                  scrollBehavior: "smooth",
                }}>
                <div className="flex flex-row items-center min-w-max mx-auto md:mx-0 md:w-full justify-between">
                  {data?.data[0].history.map((item, index) => (
                    <div
                      key={index}
                      className={`timeline-item relative flex flex-col items-center gap-3 md:gap-5 cursor-pointer mx-4 md:mx-0 transition-all duration-300 ${
                        index < visibleRange.start || index > visibleRange.end
                          ? "hidden md:flex"
                          : "flex"
                      }`}
                      onClick={() => handleYearClick(index)}>
                      <span
                        className={`${
                          activeIndex === index
                            ? "bg-primary scale-110"
                            : "bg-black/30"
                        } text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap`}>
                        {item.year}
                      </span>
                      <div
                        className={`w-6 h-6 ${
                          activeIndex === index
                            ? "bg-primary rounded-full"
                            : "bg-[#cccccc]"
                        } flex justify-center items-center transition-all duration-300`}>
                        <div className="w-[10px] h-[10px] bg-primary rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Base Line */}
              <div className="border-t-2 w-full absolute border-black/30 bottom-3 z-[-1] h-2 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Historysec;
