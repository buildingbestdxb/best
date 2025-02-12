import ImageCard from "./ImageCard";
import SecHr from "../common/SecDivider/SecHr";
import ImageContentCard from "./ImageContentCard";
import ImageCol from "./ImageCol";
const LatestNews = () => {
  return (
    <>
      <section className="py-[100px]">
        <div className="container">
          <SecHr title="Latest News" />
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
                <ImageContentCard
                  date="14 Nov 2024"
                  image="/assets/img/projects/p-1.jpg"
                  title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
                  subTitle="Project Updates, Residential"
                />
                <ImageContentCard
                  date="14 Nov 2024"
                  image="/assets/img/projects/p-1.jpg"
                  title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
                  subTitle="Project Updates, Residential"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F2F2F2]">
        <div className="container">
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-[32px] items-center ">
            <ImageCol
              date="14 Nov 2024"
              image="/assets/img/projects/p-1.jpg"
              title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
              subTitle="Project Updates, Residential"
            />
            <ImageCol
              date="14 Nov 2024"
              image="/assets/img/projects/p-1.jpg"
              title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
              subTitle="Project Updates, Residential"
            />
            <ImageCol
              date="14 Nov 2024"
              image="/assets/img/projects/p-1.jpg"
              title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
              subTitle="Project Updates, Residential"
            />
            <ImageCol
              date="14 Nov 2024"
              image="/assets/img/projects/p-1.jpg"
              title="BEST to construct AED 977 Million EMAAR’s residential complex Bridge District in Dubai Creek Harbour "
              subTitle="Project Updates, Residential"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default LatestNews;
