import React from "react";
import Details from "./Details";
import HeroSection from "../Banner/Hero";

export const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/contact/banner.jpg"
        title="Contact Us"
        breadcrumb=""
      />
      <Details />
    </>
  );
};
