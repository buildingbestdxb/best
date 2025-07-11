"use client"

import React, { useEffect, useState } from "react";
import HeroInner from "../common/Banner/HeroInner";
import Gallery from "./gallery";
import OtherProjects from "./otherProjects";
import useSWR from "swr";
import { IndiProjectType } from "@/app/types/IndiProjectType";


interface RandomProjects  {
    description:string;
    thumbnail:string;
    slug:string;
    images:string[];
    location:string;
    name:string;
    specifications:{
        name:string;
        value:string;
        _id:string;
    }[]
    type:string;
    status:string;
    _id:string;
}


export default function Index({data}:{data:IndiProjectType}) {

  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const {data:relatedProjects} = useSWR(`/api/admin/projects`,fetcher)
  const [randomProjects,setRandomProjects] = useState<RandomProjects[]>([])
 
  const breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
 /*    { label: `${data?.data.type} Projects`, href: "/" }, */
    { label: `${data?.data?.name}`, href: "" },
    // { label: `${data && data.data.sector}`, href: "#" },
  ];

  useEffect(() => {
    if (relatedProjects?.data && data?.data?._id) {
      const filtered = relatedProjects.data.filter(
        (item:{_id:string}) => item._id !== data.data._id
      );
  
      // Shuffle the filtered array
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  
      // Pick the first 3 items from the shuffled array
      const randomThree = shuffled.slice(0, 3);

      console.log(randomThree)
  
      setRandomProjects(randomThree);
    }
  }, [relatedProjects, data]);


  return (
    <>
      <HeroInner
        imageSrc={data?.data?.bannerImage == "" ? "/assets/img/projects-details/banner2.jpg"  : data?.data?.bannerImage}
        title={data?.data?.name}
        breadcrumbs={breadcrumb}
        altTag={data?.data.bannerAlt}
      />

      <Gallery data={data}/>
      <OtherProjects data={randomProjects}/>
    </>
  );
}
