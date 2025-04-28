import Index from "@/app/component/news/Index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/news/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.data?.metaTitle;
  const metadataDescription =
    data?.data?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

const News = async() => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/news/banner`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data}/>
    </>
  );
};

export default News;
