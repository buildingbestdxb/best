import Image from "next/image";
import React from "react";
import mission from "@/public/assets/img/icons/mission.svg";
import vision from "@/public/assets/img/icons/vision.svg";

const VisionMission = () => {
  return (
    <section className="py-16 md:px-12 relative overflow-hidden">
      <div className="container">
        <div className="flex items-center space-x-2 text-orange-500 text-sm font-medium">
          <span className="w-8 h-[2px] bg-orange-500"></span>
          <span>Vision & mission</span>
        </div>

        <div className="grid md:grid-cols-2 gap-[10px] items-start mt-6">
          <div className="p-[52px] text-white bg-black rounded-custom">
            <Image src={mission} alt="" className="mb-[40px]" />
            <h3 className="text-lg font-semibold uppercase leading-6 mb-5">
              Mission
            </h3>
            <p>
              Since 1975, BUILDING CO. (BEST) L.L.C metaphors to lead the
              phenomenal construction industry revolution, with its goal of
              excellence, the Company earned reputation of delivering an
              exceptional construction services in the UAE. Throughout its
              commitment towards greater endeavor, BUILDING CO. (BEST) L.L.C
              created an outstanding distinction from its PRIDE Core Foundation
              — Planning, Reliability, Innovation, Determination and Excellence.
            </p>
          </div>
          <div className="p-[52px] text-white bg-black rounded-custom">
            <Image src={vision} alt="" className="mb-[40px]" />
            <h3 className="text-lg font-semibold uppercase leading-6 mb-5">
              Vision
            </h3>
            <p>
              Since 1975, BUILDING CO. (BEST) L.L.C metaphors to lead the
              phenomenal construction industry revolution, with its goal of
              excellence, the Company earned reputation of delivering an
              exceptional construction services in the UAE. Throughout its
              commitment towards greater endeavor, BUILDING CO. (BEST) L.L.C
              created an outstanding distinction from its PRIDE Core Foundation
              — Planning, Reliability, Innovation, Determination and Excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
