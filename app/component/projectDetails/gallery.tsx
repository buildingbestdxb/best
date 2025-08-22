'use client'

import Image from "next/image";
import GalleryCard from "./galleryCard";
import { IndiProjectType } from "@/app/types/IndiProjectType";
import { useEffect, useState } from "react";
/* import parse from 'html-react-parser' */

const Gallery = ({data}:{
  data:IndiProjectType
}) => {

  const [specifications,setSpecifications] = useState<{logo:string,name:string,value:string}[]>([])
    const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (data.data.specifications) {
      console.log(data.data.status);
  
      const newSpecification = {
        logo: "/assets/img/projects/status_logo.svg",
        name: "Status",
        value: data.data.status,
      };
  
      const specifications = [
        ...data.data.specifications.slice(0, 2),
        newSpecification,
        ...data.data.specifications.slice(2),
      ];
  
      setSpecifications(specifications);
    }
  }, [data]);


  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.data.images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.data.images.length) % data.data.images.length);
  };


  return (
    <section className="  mb-0 pb-0 pt-[50px] md-py-[60px] lg-py-[100px] ">
      <div className="container">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12">
          <div className="xl:col-span-5 xl:pr-[100px] lg:pr-[60px]  ">
            <div className="bg-[#F2F2F2] md:px-[60px] md:pt-[60px] md:pb-[30px] px-8 pt-8 pb-6 rounded-custom">
              {specifications?.map((sector, index) => (
                <div
                  key={index}
                  className="grid lg:grid-cols-12 lg:gap-6 gap-2  lg:mb-[30px] mb-4 border-b border-[#1E1E1E]/30 lg:pb-[32px] pb-3 items-center ">
                  <div className="col-span-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={sector.logo || "data:"}
                        alt={sector.name}
                        width={20}
                        height={20}
                      />
                      <p className="text-primary text-[16px] font-[800] uppercase">
                        {sector.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h4 className="text-[16px] text-black/75 font-[400]">
                      {sector.value}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-7 text-black/60  text-[18px] lg-mb-0 lg:mt-0 mt-6 lg:mb-6 leading-[25.2px] font-[400]">
            {/* <p className="text-black/60  text-[18px] lg-mb-0 lg:mt-0 mt-6 mb-6 leading-[25.2px] font-[400] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit.
            </p> */}
      {/*       <div className="text-black/60  text-[18px] lg-mb-0 lg:mt-0 mt-6 mb-6 leading-[25.2px] font-[400]">
            {parse(data?.data?.description || "")}</div> mt-[60px] */}
            <div className="flex justify-between items-center">

            <h3 className="text-lg text-black font-bold mb-[40px]  uppercase">
              Gallery
            </h3>
            <div className="mb-[40px] flex items-center">
            {data.data.images.length > 1 && <button
                    className="backdrop-blur-[10px] bg-[#435368]  hover:bg-[#435368a3] transition-all duration-100 ease-in-out text-primary p-[20px] rounded-[16px] group z-50"
                    onClick={handlePrev}
                  >
                    <Image
                      src="/assets/img/projects-details/next-icn.svg"
                      alt="Previous"
                      width={18}
                      height={18}
                      className="invert-[1] brightness-[0] min-w-[18px] min-h-[18px] group-hover:brightness-[1] group-hover:invert-[0]  transition-all duration-300 ease-in-out"
                    />
                  </button>}
            {data.data.images.length > 1 && <button
        className="ms-3 right-4 top-[50%] backdrop-blur-[10px] bg-[#435368]  hover:bg-[#435368a3] transition-all duration-100 ease-in-out text-primary p-[20px] rounded-[16px] group  "
        onClick={handleNext}
      >
        <Image
          src="/assets/img/projects-details/prev-icn.svg"
          alt="Next"
          width={18}
          height={18}
          className="invert-[1] brightness-[0] min-w-[18px] min-h-[18px] group-hover:brightness-[1] group-hover:invert-[0]  transition-all duration-300 ease-in-out"
        />
      </button>}
      </div>
      </div>
            <GalleryCard data={data?.data?.images} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            {/* <Image
              src="/assets/img/projects-details/gallery.jpg"
              alt=""
              width={500}
              height={500}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
