'use client'
import React, { useEffect } from "react";
import HeroInner from "../common/Banner/HeroInner";
import WhoWeare from "./WhoWeare";
import CoreValue from "./CoreValue";
import Strength from "./Strength";
import LogoTicker from "../home/sections/LogoTicker";
import Historysec from "./Historysec";
import ValueIc from "./ValueIc";
import useSWR from "swr";
import { AboutType } from "@/app/types/AboutType";

export default function Index() {
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:AboutType} = useSWR(`/api/admin/about/intro`, fetcher)


  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <>
      <HeroInner
        imageSrc="/assets/img/story/banner.jpg"
        title="Our Story"
        breadcrumbs={breadcrumb}
      />
      <WhoWeare data={data}/>
      <CoreValue data={data}/>
      <ValueIc data={data}/>
      <Strength data={data}/>
      <LogoTicker data={data}/>
      <Historysec data={data}/>

    </>
  );
}
