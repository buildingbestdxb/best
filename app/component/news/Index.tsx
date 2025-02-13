import HeroSection from "../common/Banner/Hero";
import LatestNews from "./LatestNews";

import React from "react";

export default function Index() {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="News"
        breadcrumb=""
      />
      <LatestNews />
    </>
  );
}
