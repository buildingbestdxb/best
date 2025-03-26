import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ data }: {
  data: {
    description: string;
    thumbnail:string;
    images: string[];
    location: string;
    name: string;
    specifications: {
      name: string;
      value: string;
      _id: string;
    }[];
    type: string;
    _id: string;
  }[]
  type?:string | string[];
  handleLoadMore?:()=>void
}) => {

  const limit = 8;
  const [visible, setVisible] = useState(limit);
  const [displayData, setDisplayData] = useState(data?.slice(0, limit));
  const [noLoadMore,setNoLoadMore] = useState(false)


  const handleLoadMore = () => {
    console.log("clicked")
    const newVisible = visible + limit;
    setDisplayData((prev) => [...prev, ...data.slice(visible, newVisible)]);
    setVisible(newVisible); // Update visible count
};

useEffect(()=>{
  if(visible>=data?.length){
    setNoLoadMore(true)
    return;
  }else{
    setNoLoadMore(false)
  }
},[data,visible])

useEffect(()=>{
  setDisplayData(data?.slice(0, limit))
},[data])

  return (
    <>
      <section className="section-spacing">
        <div className="container">
          <div>
            <div className="block md:flex bg-black p-6 md:p-7 pt-3 items-center mb-6 rounded-sm">
              <div className="w-full md:w-4/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                  <div>
                    <div className="relative w-full">
                      <select className="w-full bg-transparent text-white py-2 pr-8 pl-3 border-b border-white appearance-none focus:outline-none focus:border-gray-300 transition duration-300">
                        <option className="bg-black text-white" value="">Status</option>
                        <option className="bg-black text-white" value="Completed">Completed</option>
                        <option className="bg-black text-white" value="Ongoing">Ongoing</option>
                      </select>

                    </div>
                  </div>
                  <div>
                    <div className="relative w-full">
                      <select className="w-full bg-transparent text-white py-2 pr-8 pl-3 border-b border-white appearance-none focus:outline-none focus:border-gray-300 transition duration-300">

                        <option className="bg-black text-white" value="">Industries </option>
                        <option className="bg-black text-white" value="Industrial">Industrial </option>
                        <option className="bg-black text-white" value="Healthcare">Healthcare</option>
                        <option className="bg-black text-white" value="Hospitality">Hospitality</option>
                        <option className="bg-black text-white" value="Residential">Residential</option>
                        <option className="bg-black text-white" value="Retail">Retail</option>
                        <option className="bg-black text-white" value="Commercial">Commercial</option>
                      </select>

                    </div>
                  </div>
               </div>
              </div>
            </div>
            </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center">
            {displayData?.map((item, index) => (
              index == 0 ? (<div className="xl:col-span-8" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.thumbnail}
                  href={`/project-details/${item._id}?type=${item.type}`}
                />
              </div>) : (<div className="xl:col-span-4" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.thumbnail}
                  href={`/project-details/${item._id}?type=${item.type}`}
                />
              </div>)
            ))}

          </div>
          <div className="border-b border-[#1E1E1E]/30 pt-[80px]">
          {!noLoadMore && <div className="flex items-center justify-center  pb-[20px] cursor-pointer ">
              <p className="text-[#1E1E1E] text-[22px] font-[500]" onClick={handleLoadMore}>
                More Projects
              </p>
              <Image
                src="/assets/img/projects/down-arrow.svg"
                alt="Arrow Icon"
                width={18}
                height={18}
                className="ml-2 "
                />
            </div>}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectList;
