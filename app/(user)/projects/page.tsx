import Projects from '@/app/component/Projects/Index'
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle;
  const metadataDescription =
    data?.data?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

const page = async() => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects/banner`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <Projects data={data}/>
  )
}

export default page