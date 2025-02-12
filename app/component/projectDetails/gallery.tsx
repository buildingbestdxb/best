import Image from "next/image";
import GalleryCard from "./GalleryCard";

const Gallery = () => {
  const sectors = [
    {
      icon: "/assets/img/projects-details/i1.svg",
      title: "Sector Title",
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
    <section>
      <div className="container">
        <div className="grid md:grid-cols-2 xl:grid-cols-12 xl:gap-[100px] lg:gap-[30px] mt-5 lg:mt-[60px]">
          <div className="xl:col-span-5">
            <div className="bg-[#F2F2F2] p-[60px] rounded-custom">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 mb-[30px] border-b border-[#1E1E1E]/30 pb-[32px]">
                  <div className="flex items-center gap-4">
                    <Image
                      src={sector.icon}
                      alt={sector.title}
                      width={18}
                      height={18}
                    />
                    <p className="text-primary">{sector.title}</p>
                  </div>
                  <p>{sector.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-7">
            <p className="text-[#1E1E1E99] text-[18px] mb-[60px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit.
            </p>
            <h3 className="text-[32px] text-[#1E1E1E] font-bold mb-[40px]">
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
