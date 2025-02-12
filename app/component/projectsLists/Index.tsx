import React from "react";
import HeroSection from "../common/Banner/Hero";
import ProjectCard from "./ProjectList";

import Sectors from "./Sectors";

const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects/banner.jpg"
        title="Commercial Projects"
        breadcrumb="Projects /"
      />

      <ProjectCard />
      <Sectors />
    </>
  );
};

export default Index;
