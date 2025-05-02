"use client"

import React from "react";
import useSWR from "swr";
import CareerDetails from "./CareerDetails";
import HeroSection from "../Banner/Hero";
import ApplicationForm from "../careers/ApplicationForm";

interface CareerData {
  data:{
    title:string
    location:string
    department:string
    experience:string
    type:string
    description:string
  }
}

export default function Index({data}:{data:CareerData}) {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())

  const { data:bannerData }:{data:{data:{image:string}[]}} = useSWR(`/api/admin/careers/banner`, fetcher)

  return (
    <>
       <HeroSection
              imageSrc={bannerData?.data[0]?.image == "" ? "/assets/img/careers/banner.jpg" : bannerData?.data[0]?.image}
              title="Careers"
              breadcrumb=""
            />



              <CareerDetails data={data}/>
                <ApplicationForm data={data}/>

    </>
  );
}
