import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import Certificates from "./Certificates";

export default function Index({data}:{data:{data:{image:string,alt:string}[]}}) {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "News and Events", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  return (
    <>
      <HeroInner
        imageSrc={data.data[0].image}
        title="Accreditations"
        breadcrumbs={breadcrumb}
        altTag={data.data[0].alt}
      />
<Certificates />

    </>
  );
}
