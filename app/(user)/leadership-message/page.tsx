import Index from "@/app/component/Leadership";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/leadership`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle || "Best";
  const metadataDescription =
    data?.data?.metaDescription || "Best";

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function ProjectsDetails() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/leadership`, { next: { revalidate: 60 } });
  const data = await response.json();
console.log(data)
  return (
    <>
      <Index data={data.data}/>
    </>
  );
}

