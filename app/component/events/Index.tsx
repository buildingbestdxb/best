import React from "react";
import LatestNews from "./LatestEvents";
import HeroSection from "../common/Banner/Hero";

export default function Index() {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="Events"
        breadcrumb=""
      />
      <LatestNews />
    </>
  );
}
