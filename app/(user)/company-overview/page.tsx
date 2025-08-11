import Index from "@/app/component/Ourstory";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/about/intro`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data[0]?.metaTitle;
  const metadataDescription =
    data?.data[0]?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function ProjectsDetails() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/about/intro`, { next: { revalidate: 60 } });
  const data = await response.json();

  return (
    <>
      <Index data={data} />
    </>
  );
}

