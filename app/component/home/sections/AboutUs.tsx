import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="flex items-center space-x-2 text-primary text-sm font-medium">
          <span className="w-[24px] h-[2px] bg-primary"></span>
          <span>ABOUT US</span>
          <hr />
        </div>

        <div className="grid md:grid-cols-12 gap-[80px] flex items-center mt-6">
          <div className="relative w-full h-[400px] md:h-[500px] col-span-4">
            <Image
              src="/assets/img/home/abt01.jpg"
              alt="About Us"
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-lg"
            />

            <div className="absolute bottom-4 w-full flex justify-center">
              <div className="flex gap-4 justify-center bg-white/10 backdrop-blur-[10px]  px-4 py-3 rounded-full">
                <Image
                  src="/assets/img/home/iso-9001.svg"
                  alt=""
                  width={100}
                  height={100}
                />
                <Image
                  src="/assets/img/home/iso-9001.svg"
                  alt=""
                  width={100}
                  height={100}
                />
                <Image
                  src="/assets/img/home/iso-9001.svg"
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <h2 className="text-lg font-bold text-gray-900">
              BUILDING CO. (BEST) L.L.C
            </h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Since 1975, BUILDING CO. (BEST) L.L.C metaphors to lead the
              phenomenal construction industry revolution, with its goal of
              excellence, the Company earned reputation of delivering an
              exceptional construction services in the UAE. Throughout its
              commitment towards greater endeavor, BUILDING CO. (BEST) L.L.C
              created an outstanding distinction from its PRIDE Core Foundation
              — Planning, Reliability, Innovation, Determination and Excellence.
            </p>
            <button className="mt-6 px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium transition">
              + MORE ABOUT US
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
