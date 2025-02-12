import HeroSection from "../common/Banner/Hero";
import LatestEvents from "./LatestEvents";

const Index = () => {
  return (
    <>
      <HeroSection
        imageSrc="/assets/img/projects-details/banner.jpg"
        title="Events"
        breadcrumb=""
      />
      <LatestEvents />
    </>
  );
};
export default Index;
