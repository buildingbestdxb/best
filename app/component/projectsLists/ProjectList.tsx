import React, { useEffect, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import StatusTab from "./StatusTab";

const ProjectList = ({
  data,
}: {
  data: {
    description: string;
    thumbnail: string;
    slug?: string;
    thumbnailAlt?: string;
    bannerImage?: string;
    bannerAlt?: string;
    images: string[];
    location: string;
    name: string;
    specifications: {
      name: string;
      value: string;
      _id: string;
    }[];
    type: string;
    status: string;
    _id: string;
  }[];
  type?: string | string[];
  handleLoadMore?: () => void;
}) => {
  const limit = 8;
  // const [visible, setVisible] = useState(limit);
  const [displayData, setDisplayData] = useState(data);
  // const [noLoadMore, setNoLoadMore] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");


  //Sort Ongoing first, then Completed
const sortedData = useMemo(() => {
  const list = Array.isArray(data) ? data : []; // ✅ ensure iterable
  if (selectedStatus || selectedType) {
    return list.filter((item) => {
      const typeMatch = selectedType === "" || item.type === selectedType;
      const statusMatch = selectedStatus === "" || item.status === selectedStatus;
      return typeMatch && statusMatch;
    });
  }
  return [...list]
  
}, [data, selectedType, selectedStatus]);

  useEffect(() => {
    setDisplayData(sortedData);
    // setVisible(limit);
    // setNoLoadMore(sortedData.length <= limit);
  }, [sortedData]);

  return (
    <section className="section-spacing">
      <div className="container">
        <div className="block md:flex bg-primary p-6 md:p-8 pt-3 items-center mb-6 rounded-xl">
          <div className="w-full md:w-full">
            <div className="grid grid-cols-1 md:grid-cols-5 md:gap-[40px]">
              <div className="col-span-4">
                <StatusTab
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              </div>
              <div
                className="relative w-full h-[50px] bg-black flex items-center rounded-xl group justify-center cursor-pointer border-primary hover:bg-transparent hover:border-[2px] hover:border-black hover:text-black transition-all duration-300"
                onClick={() => {
                  setSelectedStatus("");
                  setSelectedType("");
                }}
              >
                <p className="font-[500] text-white group-hover:text-black">Reset</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center">
          {displayData?.map((item, index) =>
            index === 0 ? (
              <div className="xl:col-span-8" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.thumbnail}
                  href={`/project-details/${item.slug}`}
                  imageAlt={item.thumbnailAlt}
                />
              </div>
            ) : (
              <div className="xl:col-span-4" key={index}>
                <ProjectCard
                  locationName={item.location}
                  title={item.name}
                  image={item.thumbnail}
                  href={`/project-details/${item.slug}`}
                  imageAlt={item.thumbnailAlt}
                />
              </div>
            )
          )}
        </div>

        {/* <div className="border-b border-[#1E1E1E]/30 pt-[80px]">
          {!noLoadMore && (
            <div
              className="flex items-center justify-center pb-[20px] cursor-pointer"
            >
              <p className="text-[#1E1E1E] text-[22px] font-[500]">
                More Projects
              </p>
              <Image
                src="/assets/img/projects/down-arrow.svg"
                alt="Arrow Icon"
                width={18}
                height={18}
                className="ml-2"
              />
            </div>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default ProjectList;
