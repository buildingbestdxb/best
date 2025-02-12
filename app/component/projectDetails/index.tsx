import React from "react";
import HeroSection from "../common/Banner/Hero";
import OtherProjects from "./OtherProjects";
import Gallery from "./Gallery";

const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="3000 Prayer Mosque"
        breadcrumb="Projects / Commercial Projects /"
      />
      <Gallery />
      <OtherProjects />
    </>
  );
};

export default Index;
