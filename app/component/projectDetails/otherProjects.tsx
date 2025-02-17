import React from "react";

import ProjectCard from "../projectsLists/ProjectCard";

const ProjectList = () => {
  return (
    <>
      <section className="section-spacing">
        <div className="container">
          <h2 className="text-lg text-black uppercase font-bold leading-none">
            Other Commercial Projects
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center mt-5 lg:mt-[60px]">
            <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"3000 Prayer Mosque"}
                image="/assets/img/projects-details/po1.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"22 Villas Al Khalidiya"}
                image="/assets/img/projects-details/po2.jpg"
              />
            </div>
            <div className="xl:col-span-4">
              <ProjectCard
                locationName="Kalba,Sharjah."
                title={"Gardenia Residence"}
                image="/assets/img/projects-details/po3.jpg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectList;
