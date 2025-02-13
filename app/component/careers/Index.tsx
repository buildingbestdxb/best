import React from "react";
import HeroSection from "../common/Banner/Hero";
import OpenPositions from "./OpenPositions";

export default function Index() {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/careers/banner.jpg"
        title="Careers"
        breadcrumb=""
      />
      <OpenPositions />
    </>
  );
}
