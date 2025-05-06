import React from "react";
import Index from "@/app/component/apply/Index";

export default async function Careers({params}:{params:Promise<{slug:string}>}) {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/careers/byid?slug=${slug}`)
  const data = await response.json()
  return (
    <>
      <Index data={data}/>
    </>
  );
}
