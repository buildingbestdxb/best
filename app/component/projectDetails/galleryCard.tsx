"use client";

import Image from "next/image";

export default function ImageCarousel({ data,activeIndex,setActiveIndex }: { data: string[],activeIndex:number,setActiveIndex:React.Dispatch<React.SetStateAction<number>> }) {


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [data.length]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg w-full lg:h-[571px] h-[400px]   ">

      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full w-full"
         
        style={{
          transform: `translateX(-${activeIndex * 100}%)`, 
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
      {/* <button
        className="me-3 left-4 bottom-[32px] backdrop-blur-[10px] bg-[#435368]  hover:bg-[#435368a3] transition-all duration-100 ease-in-out text-primary p-[20px] rounded-[16px] group"
        onClick={handlePrev}
      >
        <Image
          src="/assets/img/projects-details/next-icn.svg"
          alt="Previous"
          width={18}
          height={18}
          className="invert-[1] brightness-[0] min-w-[18px] min-h-[18px] group-hover:brightness-[1] group-hover:invert-[0]  transition-all duration-300 ease-in-out"
        />
      </button> */}

      
        <div className="flex   gap-2 max-w-[180px] md:max-w-[400px]   lg:max-w-[250px] xl:max-w-[500px] overflow-scroll scrollbar-whide" >
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
        {/* <button
        className=" ms-3 right-4 bottom-[32px] backdrop-blur-[10px] bg-[#435368]  hover:bg-[#435368a3] transition-all duration-100 ease-in-out text-primary p-[20px] rounded-[16px] group  "
        onClick={handleNext}
      >
        <Image
          src="/assets/img/projects-details/prev-icn.svg"
          alt="Next"
          width={18}
          height={18}
          className="invert-[1] brightness-[0] min-w-[18px] min-h-[18px] group-hover:brightness-[1] group-hover:invert-[0]  transition-all duration-300 ease-in-out"
        />
      </button> */}
      </div>
    </div>
  );
}
