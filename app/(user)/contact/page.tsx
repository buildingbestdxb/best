import { Index } from "@/app/component/contact/Index";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact/meta`, { next: { revalidate: 60 } });
  const data = await response.json();

  const metadataTitle = data?.contact?.metaTitle;
  const metadataDescription =
    data?.contact?.metaDescription;

  return {
    title: metadataTitle,
    description: metadataDescription,
  };
}

const Contact = async() => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact/banner`, { next: { revalidate: 60 } });
  const data = await response.json();
  return (
    <>
      <Index data={data}/>
    </>
  );
};
export default Contact;
