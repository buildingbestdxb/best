import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import Gallery from "./gallery";
import OtherProjects from "./otherProjects";
const breadcrumb = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/" },
  { label: "Commercial Projects", href: "/" },
  { label: "3000 Prayer Mosque", href: "" },
  // { label: `${data && data.data.sector}`, href: "#" },
];

export default function Index() {
  return (
    <>
      <HeroInner
        imageSrc="/assets/img/projects-details/banner2.jpg"
        title="3000 Prayer Mosque"
        breadcrumbs={breadcrumb}
      />

      <Gallery />
      <OtherProjects />
    </>
  );
}
