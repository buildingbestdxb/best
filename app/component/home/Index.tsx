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
const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <StatsSection
        data={stats.data}
        colms={3}
        bannerimage={stats.bannerimage}
      />
      <LogoTicker />
      <SectorsSec />
      <QualitySafety />
      <VisionMission />
      <OurLocation />
      <ContactUs />
    </>
  );
};

export default Index;
