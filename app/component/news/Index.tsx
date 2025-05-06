import React from "react";
import HeroSection from "../common/Banner/Hero";
import LatestNews from "./LatestNews";

interface Banner {
  data:{
    image:string
    alt:string
  }

}

export default function Index({data}: {data: Banner}) {
  return (
    <>
      <HeroSection
        imageSrc={data.data.image}
        title="News & Events"
        breadcrumb=""
        altTag={data.data.alt}
      />
      <LatestNews />
    </>
  );
}
