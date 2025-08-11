import Index from "@/app/component/Leadership";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {



  return {
    title: "Leadership Message",
    description: "metadataDescription",
  };
}

export default async function ProjectsDetails() {


  return (
    <>
      <Index />
    </>
  );
}

