import React from "react";

import ProjectCard from "../projectsLists/ProjectCard";

const ProjectList = () => {
  return (
    <>
      <section className="pt-10 pb-[100px]">
        <div className="container">
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center mt-5 lg:mt-[60px]">
            <div className="xl:col-span-4">
              <ProjectCard
                title={"3000 Prayer Mosque"}
                image="/assets/img/projects/p-1.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"22 Villas Al Khalidiya"}
                image="/assets/img/projects/p-2.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                title={"Gardenia Residence"}
                image="/assets/img/projects/p-3.jpg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectList;
