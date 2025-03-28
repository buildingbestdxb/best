"use client"

import React from "react";
import useSWR from "swr";
import CareerDetails from "./CareerDetails";
import HeroSection from "../Banner/Hero";

export default function Index() {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())

  const { data }:{data:{data:{image:string}[]}} = useSWR(`/api/admin/careers/banner`, fetcher)

  return (
    <>
       <HeroSection
              imageSrc={data?.data[0]?.image == "" ? "/assets/img/careers/banner.jpg" : data?.data[0]?.image}
              title="Careers"
              breadcrumb=""
            />
     <CareerDetails />
    </>
  );
}
