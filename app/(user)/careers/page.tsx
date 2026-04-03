import React from "react";
import Index from "@/app/component/careers/Index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/careers/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle;
  const metadataDescription =
    data?.data?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function Careers() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/careers/banner`)
  const data = await response.json()
  const departmentResponse = await fetch(`${process.env.BASE_URL}/api/admin/careers/department`)
  const departmentData = await departmentResponse.json()
  return (
    <>
      <Index data={data} departmentData={departmentData}/>
    </>
  );
}
