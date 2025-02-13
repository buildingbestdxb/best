import React from "react";
import HeroSection from "../common/Banner/Hero";
import OtherProjects from "./otherProjects";
import Gallery from "./gallery";

export default function Index() {
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
}
