"use client"

import React from "react";
import Details from "./Details";
import HeroInner from "../common/Banner/Hero";

export const Index = ({data}:{data:{data:{image:string,alt:string}[]}}) => {

  return (
    <>
      <HeroInner
        imageSrc={data?.data[0]?.image == "" ? "/assets/img/contact/banner.jpg" : data?.data[0]?.image}
        title="Contact Us"
        breadcrumb=""
        altTag={data?.data[0]?.alt}
      />
      <Details />
    </>
  );
};
