import NewsDetails from '@/app/component/NewsDetails/Index'
import { Metadata } from 'next';
import React from 'react'


export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/news/byid?slug=${slug}`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle;
  const metadataDescription =
    data?.data?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

const page = async({params}: {params: Promise<{slug: string}>}) => {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/news/byid?slug=${slug}`);
  const data = await response.json();

  return (
    <NewsDetails data={data} />
  );
}


export default page