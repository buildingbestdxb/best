"use client"

import React from "react";
import HeroSection from "../common/Banner/Hero";
import OpenPositions from "./OpenPositions";
// import ApplicationForm from "./ApplicationForm";

export default function Index({data,departmentData}:{data:{data:{image:string,alt:string}[]},departmentData:{data:{name:string}[]}}) {

  // const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  // const { data }:{data:{data:{image:string}[]}} = useSWR(`/api/admin/careers/banner`, fetcher)


  return (
    <>
      <HeroSection
        imageSrc={data?.data[0]?.image == "" ? "/assets/img/careers/banner.jpg" : data?.data[0]?.image}
        title="Careers"
        breadcrumb=""
        altTag={data?.data[0].alt}
      />
      <OpenPositions departmentData={departmentData}/>

      {/* <ApplicationForm /> */}
    </>
  );
}
