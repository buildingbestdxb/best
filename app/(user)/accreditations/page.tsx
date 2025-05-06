import Index from "@/app/component/Accreditations";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/accreditation/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle;
  const metadataDescription =
    data?.data?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

export default async function ProjectsDetails() {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/accreditation/banner`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data}/>
    </>
  );
}
