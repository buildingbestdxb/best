import Image from "next/image";
import GalleryCard from "./galleryCard";

const Gallery = () => {
  const sectors = [
    {
      icon: "/assets/img/projects-details/i1.svg",
      title: "Sector",
      content: "Commercial",
    },
    {
      icon: "/assets/img/projects-details/i2.svg",
      title: "Developer",
      content: "Lorem",
    },
    {
      icon: "/assets/img/projects-details/i3.svg",
      title: "Status",
      content: "Completed",
    },
    {
      icon: "/assets/img/projects-details/i4.svg",
      title: "Type",
      content: "High Rise",
    },
    {
      icon: "/assets/img/projects-details/i5.svg",
      title: "BUA",
      content: "126, 247 m2",
    },
    {
      icon: "/assets/img/projects-details/i6.svg",
      title: "Scope",
      content: "Design & Build",
    },
    {
      icon: "/assets/img/projects-details/i7.svg",
      title: "Contract value",
      content: "AED 470 Million",
    },
    {
      icon: "/assets/img/projects-details/i8.svg",
      title: "City",
      content: "Dubai",
    },
    // Add more objects as needed
  ];

  return (
    <section className="section-spacing mb-0">
      <div className="container">
        <div className="grid lg:grid-cols-2 xl:grid-cols-12">
          <div className="xl:col-span-5 xl:pr-[100px] lg:pr-[60px]  ">
            <div className="bg-[#F2F2F2] p-[60px] rounded-custom">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="grid lg:grid-cols-12 gap-5 lg:gap-10 mb-[30px] border-b border-[#1E1E1E]/30 pb-[32px] items-center ">
                  <div className="col-span-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={sector.icon}
                        alt={sector.title}
                        width={20}
                        height={20}
                      />
                      <p className="text-primary text-[16px] font-[800] uppercase">
                        {sector.title}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h4 className="text-[22px] text-black/75 ">
                      {sector.content}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-7">
            <p className="text-black/60 opacity-75 text-[18px] lg-mb-0 lg:mt-0 mt-6 mb-6 leading-[25.2px] font-[400] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit.reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit.
            </p>
            <h3 className="text-lg text-black font-bold mb-[40px] mt-[60px] uppercase">
              Gallery
            </h3>
            <GalleryCard />
            {/* <Image
              src="/assets/img/projects-details/gallery.jpg"
              alt=""
              width={500}
              height={500}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
