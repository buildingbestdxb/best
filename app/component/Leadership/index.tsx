'use client'
import React from "react";
import HeroInner from "../common/Banner/HeroInner";
import Message from "../Leadership/GmChairman";
import { LeaderShipType } from "@/app/types/LeaderShipType";


export default function Index({data}:{data:LeaderShipType}) {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Leadership Message", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  // const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  // const { data }:{data:AboutType} = useSWR(`/api/admin/about/intro`, fetcher)


  return (
    <>
      
      <HeroInner
        imageSrc={data.bannerImage}
        title={data.pageTitle}
        breadcrumbs={breadcrumb}
        altTag={data.bannerImageAlt}
      />
      <Message data={data.messageSection}/>

    </>
  );
}
