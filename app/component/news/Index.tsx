import HeroSection from "../common/Banner/Hero";
import LatestNews from "./LatestNews";

const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="News"
        breadcrumb=""
      />
      <LatestNews />
    </>
  );
};
export default Index;
