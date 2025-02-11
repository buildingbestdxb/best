import React from "react";
import HeroSection from "../projectDetails/Hero";
import OtherProjects from "../projectDetails/otherProjects";
import Gallery from "./gallery";

const Index = () => {
  return (
    <>
      <HeroSection />
      <Gallery />
      <OtherProjects />
    </>
  );
};

export default Index;
