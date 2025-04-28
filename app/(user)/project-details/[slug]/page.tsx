import Index from "@/app/component/projectDetails";

export default async function ProjectsDetails({params}:{params:Promise<{slug:string}>}) {
  const slug = (await params).slug
  const response = await fetch(`${process.env.BASE_URL}/api/admin/projects/byid?slug=${slug}`)
  const data = await response.json()
  return (
    <>
      <Index data={data}/>
    </>
  );
}
