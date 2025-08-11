'use client'
import React, { useEffect } from "react";
import HeroInner from "../common/Banner/HeroInner";
import Message from "../Leadership/GmChairman";
import { AboutType } from "@/app/types/AboutType";

export default function Index() {
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
        imageSrc="/assets/img/story/banner.jpg"
        title="Leadership Message"
        breadcrumbs={breadcrumb}
        altTag="banner"
      />
      <Message />


    </>
  );
}
