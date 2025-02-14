import React from "react";

import ProjectList from "./ProjectList";
import HeroSection from "../common/Banner/Hero";
import Sectors from "./Sectors";

export default function Index() {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects/banner.jpg"
        title="Commercial Projects"
        breadcrumb="Projects /"
      />

      <ProjectList />
      <Sectors />
    </>
  );
}
