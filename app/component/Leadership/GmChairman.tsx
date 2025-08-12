"use client";
import Image from "next/image";
import { motion } from "framer-motion";




const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const slideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};


const CoreValue = () => {
    return (
        <motion.section
            className="section-spacing overflow-hidden"
            initial="hidden"
            animate="visible">
            <div className="container">
                {/* <div className="mb-4 md:mb-[60px]">
          <SecHr title="Core Values & Expertise" />
        </div> */}

                <div className="md:grid md:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
                    <div className="col-span-8">
                        <motion.div
                            variants={slideLeft}
                            className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none"
                        >
                            <h2 className="text-lg font-bold text-black">
                                Chairman’s Message
                            </h2>
                            <div
                        className="relative w-full h-[300px] md:h-[500px] col-span-4 md:hidden block">
                        <Image
                            src="/assets/img/home/abt01.jpg"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                            <div>
                                <p className="leading-relaxed text-black/75 mb-3">
                                    At BLDG CO. – BEST L.L.C., our journey began with a clear vision: to be true builders – contributing to the development of our beloved nation and leaving a positive, lasting impact with every project we undertake.
                                </p>
                                <p className="leading-relaxed text-black/75 mb-3">
                                    As members of a growing society and a proud homeland, our responsibility extends beyond construction. It is about fostering trust, delivering value, and upholding the principles of integrity and excellence in everything we do.
                                </p>
                                <p className="leading-relaxed text-black/75 mb-6">We remain committed to empowering the next generation of professionals, embracing innovation, and continuing to support the UAE’s growth and prosperity.</p>
                                <p className="mb-3"><strong>H.E. Sheikh Tarik Bin Faisal Al Qasimi
                                </strong></p>
                                <p><strong>Chairman
                                </strong></p>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        variants={slideLeft}
                        className="relative w-full h-[300px] md:h-[500px] col-span-4 hidden md:block">
                        <Image
                            src="/assets/img/home/abt01.jpg"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg"
                        />
                    </motion.div>
                </div>

                <div className="my-4 md:my-[60px]">
                    <hr />
                </div>
                <div className="md:grid md:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
                    <motion.div
                        variants={slideRight}
                        className="relative w-full h-[300px] md:h-[500px] col-span-4 hidden md:block">
                        <Image
                            src="/assets/img/home/abt01.jpg"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg"
                        />
                    </motion.div>
                    <div className="col-span-8">
                        <motion.div
                            className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none"
                            variants={slideRight}>
                            <h2 className="text-lg font-bold text-black">
                                Managing Director’s Message
                            </h2>
                           <div
                        className="relative w-full h-[300px] md:h-[500px] col-span-4 md:hidden block">
                        <Image
                            src="/assets/img/home/abt01.jpg"
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                            <div>
                                <p className="leading-relaxed text-black/75 mb-3">
                                    At BLDG CO. - BEST L.L.C., we are proud of our legacy of over 50 years of excellence in the UAE’s construction industry — a journey built on trust, quality, and commitment to our clients and our nation.
                                </p>
                                <p className="leading-relaxed text-black/75 mb-3">As a local UAE company, our foundations are deeply rooted in the values of this country. We don’t just construct buildings; we build trust, create opportunity, and contribute to shaping the future of our communities.</p>
                                <p className="leading-relaxed text-black/75 mb-3">Every project we undertake reflects our dedication to precision, safety, and innovation. With a passionate team and a forward-looking vision, we remain committed to continuing our legacy and reinforcing our role as a key partner in the UAE’s development.</p>
                                <p className="leading-relaxed text-black/75 mb-6">Together, we build the future — with purpose, pride, and excellence.</p>
                                <p className="mb-3"><strong>Elie Zgheib
                                </strong></p>
                                <p><strong>Managing Director
                                </strong></p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default CoreValue;
