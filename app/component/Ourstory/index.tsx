import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import WhoWeare from "./WhoWeare";
import CoreValue from "./CoreValue";
import StatsSection from "../home/sections/StatsSection";
import Strength from "./Strength";
import LogoTicker from "../home/sections/LogoTicker";
import Historysec from "./Historysec";

export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];
  const stats = {
    bannerimage: "/assets/img/story/storystar.jpg",
    data: [{ value: 50, label: "Planning", icon: "/assets/img/story/ico1.svg" },
      { value: 150, label: "Quality", icon: "/assets/img/story/ico2.svg" },
      { value: 100, label: "Integrity", icon: "/assets/img/story/ico3.svg" },
      { value: 100, label: "Excellence", icon: "/assets/img/story/ico4.svg" },
      { value: 100, label: "Commitment", icon: "/assets/img/story/ico5.svg" },]
    };
  return (
    <>
      <HeroInner
        imageSrc="/assets/img/story/banner.jpg"
        title="Our Story"
        breadcrumbs={breadcrumb}
      />
      <WhoWeare />
      <CoreValue />
      <StatsSection data={stats.data} colms={5} bannerimage={stats.bannerimage} />
      <Strength />
      <LogoTicker />
      <Historysec />

    </>
  );
}
