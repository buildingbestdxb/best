import React from "react";
import HeroSection from "../common/Banner/Hero";
import Details from "./Details";

export const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="Contact"
        breadcrumb=""
      />
      <Details />
    </>
  );
};
