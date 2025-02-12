import React from "react";
import Image from "next/image";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  return (
    <>
      <section className="pt-10 pb-[100px]">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center mt-5 lg:mt-[60px]">
            <div className="xl:col-span-8">
              <ProjectCard
                title={"3000 Prayer Mosque"}
                image="/assets/img/projects/p-1.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"Gardenia Residence"}
                image="/assets/img/projects/p-2.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"Al Ansari Residential Building – Noor Tower"}
                image="/assets/img/projects/p-3.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"Scientific Research Building – Sharjah University"}
                image="/assets/img/projects/p-4.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"Al Zahra Hospital Dubai"}
                image="/assets/img/projects/p-5.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"Gardenia Residence"}
                image="/assets/img/projects/p-6.jpg"
              />
            </div>
            <div className="xl:col-span-8">
              <ProjectCard
                title={"3000 Prayer Mosque"}
                image="/assets/img/projects/p-7.jpg"
              />
            </div>
          </div>
          <div className="border-b border-[#1E1E1E]/30 pt-[80px]">
            <div className="flex items-center justify-center  pb-[20px] cursor-pointer ">
              <p className="text-[#1E1E1E] text-[22px] font-[500]">
                More Projects
              </p>
              <Image
                src="/assets/img/projects/down-arrow.svg"
                alt="Arrow Icon"
                width={18}
                height={18}
                className="ml-2 "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectList;
