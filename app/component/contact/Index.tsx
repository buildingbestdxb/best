"use client"

import React, { useEffect } from "react";
import Details from "./Details";
import HeroInner from "../common/Banner/Hero";
import useSWR from "swr";

export const Index = () => {
  
  const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
  const { data }:{data:{data:{image:string}[]}} = useSWR(`/api/admin/contact/banner`, fetcher)

  useEffect(()=>{
    console.log(data?.data[0].image)
  },[data])


  return (
    <>
      <HeroInner
        imageSrc={data?.data[0]?.image == "" ? "/assets/img/contact/banner.jpg" : data?.data[0]?.image}
        title="Contact Us"
        breadcrumb=""
      />
      <Details />
    </>
  );
};
