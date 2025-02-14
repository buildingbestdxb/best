import ImageCard from "../news/ImageCard";
import Image from "next/image";
import SecHr from "../common/SecDivider/SecHr";
import ImageContentCard from "../news/ImageContentCard";
import ImageCol from "../news/ImageCol";
const latestNewsData = [
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
];
const prevNewsData = [
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
  {
    date: "14 Nov 2024",
    image: "/assets/img/projects/p-1.jpg",
    title:
      "BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour",
    subTitle: "Project Updates, Residential",
  },
];
const LatestEvents = () => {
  return (
    <>
      <section className="py-[100px]">
        <div className="container">
          <SecHr title="Latest Events" />
          <div className="grid md:grid-cols-2 xl:grid-cols-12 gap-[32px] items-center mt-5 lg:mt-[60px] ">
            <div className="xl:col-span-6">
              <ImageCard
                date="14 Nov 2024"
                image="/assets/img/projects/p-1.jpg"
                title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
                subTitle="Project Updates, Residential"
              />
            </div>
            <div className="xl:col-span-6">
              <div className="flex flex-col gap-6">
                {latestNewsData.map((latestnews, index) => {
                  return <ImageContentCard key={index} {...latestnews} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F2F2F2] py-[100px]">
        <div className="container">
          <SecHr title="Previous Events" />
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-[32px] items-center ">
            {prevNewsData.map((news, index) => (
              <ImageCol key={index} {...news} />
            ))}
          </div>
          <div className="border-b border-[#1E1E1E]/30 pt-[80px]">
            <div className="flex items-center justify-center  pb-[20px] cursor-pointer ">
              <p className="text-[#1E1E1E] text-[22px] font-[500]">
                More Events
              </p>
              <Image
                src="/assets/img/projects/down-arrow.svg"
                alt="Arrow Icon"
                width={18}
                height={18}
                className="ml-2 "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LatestEvents;
