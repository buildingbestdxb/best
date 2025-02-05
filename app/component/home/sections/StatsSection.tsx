'use client'
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 50, label: "Years of Experience", icon: "/assets/img/icons/experience.svg" },
  { value: 150, label: "Projects Completed", icon: "/assets/img/icons/experience.svg" },
  { value: 100, label: "Clients Who Trust Us", icon: "/assets/img/icons/experience.svg" },
];

const StatsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="flex justify-center items-center py-16 overflow-hidden relative section-spacing">
      <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
        <Image
          src="/assets/img/home/stastsc.jpg"
          className="absolute object-cover object-center h-full"
          alt=""
          width={1920}
          height={800}
        />
      </figure>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-primary text-white p-[32px] rounded-custom shadow-lg"
            >
              <div className="flex justify-between items-center w-full mb-[50px]">
                <span className="text-xl leading-none font-bold">
                  {inView ? <CountUp start={0} end={stat.value} duration={2} delay={0.3} /> : 0}+
                </span>
                <div>
                  <Image src={stat.icon} alt="" width={50} height={50} />
                </div>
              </div>
              <span className="text-sm mt-1 text-left flex w-full text-white/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
