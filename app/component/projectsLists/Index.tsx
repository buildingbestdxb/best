"use client"

import React, { useEffect } from "react";

import ProjectList from "./ProjectList";
import HeroSection from "../common/Banner/Hero";
import Sectors from "./Sectors";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ProjectType } from "@/app/types/ProjectType";

interface SectorData {
  data: {
    description: string;
    thumbnail:string;
    slug:string;
    thumbnailAlt: string;
    bannerImage:string;
    bannerAlt:string;
    images: string[];
    location: string;
    name: string;
    specifications: {
      name: string;
      value: string;
      _id: string;
    }[];
    type: string;
    status: string;
    _id: string;
  }[]
  type?:string | string[];
  handleLoadMore?:()=>void
}

export default function Index({data:sectorData}:{data:SectorData}) {
  
  const {type} = useParams()

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data:projectData }:{data:ProjectType} = useSWR(`/api/admin/projects`, fetcher)
  // const { data:sectorData } = useSWR(`/api/admin/sector?name=${type?.toString().replace(/^(\w)/, (match) => match.toUpperCase())}`, fetcher)

  const filteredData = projectData?.data.filter((item)=>(item.type==type))

  useEffect(()=>{
    console.log(filteredData)
    console.log(sectorData)
  },[filteredData,sectorData])



  return (
    <>
      <HeroSection
        imageSrc={sectorData?.data?.[0]?.bannerImage || "/assets/img/projects/banner.jpg"}
        title={`${type} Projects`}
        breadcrumb="Projects /"
        altTag={sectorData?.data?.[0]?.bannerAlt}
      />

      {filteredData && <ProjectList data={filteredData} type={type ?? ""}/>}
      <Sectors />
    </>
  );
}
