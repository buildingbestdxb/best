import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ data }: {
  data: {
    description: string;
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

  const limit = 7;
  const [visible, setVisible] = useState(limit);
  const [displayData, setDisplayData] = useState(data?.slice(0, limit));
  const [noLoadMore,setNoLoadMore] = useState(false)

  const handleLoadMore = () => {
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
    setDisplayData(data?.slice(0, limit))
  }
},[data,visible])

  return (
    <>
      <section className="section-spacing">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center">
            {displayData?.map((item, index) => (
              index == 0 ? (<div className="xl:col-span-8" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.images[0]}
                  href={`/project-details/${item._id}?type=${item.type}`}
                />
              </div>) : (<div className="xl:col-span-4" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.images[0]}
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
