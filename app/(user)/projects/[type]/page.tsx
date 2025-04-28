import Index from "@/app/component/projectsLists/Index";
import { Metadata } from "next";

export async function generateMetadata({params}: {params: Promise<{type: string}>}): Promise<Metadata> {
  const type = (await params).type;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/sector?name=${type?.toString().replace(/^(\w)/, (match) => match.toUpperCase())}`,{next:{revalidate:60}})
  const data = await response.json();

  const metadataTitle = data?.data[0]?.metaTitle;
  const metadataDescription =
    data?.data[0]?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}


export default async function Projects({params}:{params:Promise<{type:string}>}) {
  const type = (await params).type
  const response = await fetch(`${process.env.BASE_URL}/api/admin/sector?name=${type?.toString().replace(/^(\w)/, (match) => match.toUpperCase())}`)
  const data = await response.json()
  return (
    <>
      <Index data={data}/>
    </>
  );
}
