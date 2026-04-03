"use client";
import Image from "next/image";
import { easeOut, motion } from "framer-motion";




const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: easeOut } },
};




const CoreValue = ({data}:{data:{items:{title:string,image:string,imageAlt:string,name:string,designation:string,message?:string}[]}}) => {
    console.log(data)
    return (
        <motion.section
            className="section-spacing overflow-hidden"
            initial="hidden"
            animate="visible">
            <div className="container">
                {/* <div className="mb-4 md:mb-[60px]">
          <SecHr title="Core Values & Expertise" />
        </div> */}

                {data.items.map((item,index)=>(
                    <div key={index} className="md:grid md:grid-cols-12 gap-[50px] lg:gap-[80px] flex flex-col items-center">
                    <div className="col-span-8">
                        <motion.div
                            variants={slideLeft}
                            className="flex flex-col  gap-[20px] lg:gap-[60px] leading-none"
                        >
                            <h2 className="text-lg font-bold text-black">
                                {item.title}
                            </h2>
                            <div
                        className="relative w-full h-[300px] md:h-[500px] col-span-4 md:hidden block">
                        <Image
                            src={item.image}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                            <div>

                                <div className="leading-relaxed text-black/75 mb-3">
                                    {item.message?.split("\n").map((line,index)=>(
                                        <p key={index} className="mb-3">{line}</p>
                                    ))}
                                </div>
                               
                                <p className="mb-3"><strong>{item.name}
                                </strong></p>
                                <p><strong>{item.designation}
                                </strong></p>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        variants={slideLeft}
                        className="relative w-full h-[300px] md:h-[500px] col-span-4 hidden md:block">
                        <Image
                            src={item.image}
                            alt={item.imageAlt}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl shadow-lg"
                        />
                    </motion.div>
                </div>
                ))}

                <div className="my-4 md:my-[60px]">
                    <hr />
                </div>

            </div>
        </motion.section>
    );
};

export default CoreValue;
