"use client"

import React from "react";
import HeroSection from "./sections/HeroSection";
import AboutUs from "./sections/AboutUs";
import StatsSection from "./sections/StatsSection";
import LogoTicker from "./sections/LogoTicker";
import SectorsSec from "./sections/SectorsSec";
import QualitySafety from "./sections/QualitySafety";
import VisionMission from "./sections/VisionMission";
import OurLocation from "./sections/OurLocation";
import ContactUs from "./sections/ContactUs";
import { HomeType } from "@/app/types/HomeType";
const stats = {
  bannerimage: "/assets/img/home/stastsc.jpg",
  data: [
    {
      value: 50,
      label: "Years of Experience",
      icon: "/assets/img/icons/experience.svg",
    },
    {
      value: 150,
      label: "Projects Completed",
      icon: "/assets/img/icons/project-completed.svg",
    },
    {
      value: 50,
      label: "Clients Who Trust Us",
      icon: "/assets/img/icons/clients-who.svg",
    },
  ],
};
const Index = ({data}: {data: HomeType}) => {
  // const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  // const { data }:{data:HomeType} = useSWR(`/api/admin/home`, fetcher)

  return (
    <>
      <HeroSection />
      <AboutUs data={data}/>
      <StatsSection
        data={data}
        colms={3}
        bannerimage={stats.bannerimage}
      />
      <LogoTicker />
      <SectorsSec data={data}/>
      <QualitySafety data={data}/>
      <VisionMission data={data}/>
      <OurLocation data={data}/>
      <ContactUs data={data}/>
    </>
  );
};

export default Index;
