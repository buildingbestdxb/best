import React from "react";
import HeroSection from "../common/banner/Hero";
import OtherProjects from "../projectDetails/otherProjects";
import Gallery from "./gallery";

const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="3000 Prayer Mosque"
        breadcrumb="Projects / Commercial Projects"
      />

      <Gallery />
      <OtherProjects />
    </>
  );
};

export default Index;
