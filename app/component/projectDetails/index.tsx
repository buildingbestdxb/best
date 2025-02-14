import React from "react";
import HeroSection from "../common/Banner/Hero";
import Gallery from "./gallery";
import OtherProjects from "./otherProjects";

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
