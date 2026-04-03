"use client";

import React from "react";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";
import parse from "html-react-parser";
import moment from "moment";
import { IndiNews } from "@/app/types/IndiNews";
import ShareArticle from "./ShareArticle";
import Link from "next/link";

const NewsDetails = ({ data }: { data: IndiNews }) => {


  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <div className="container flex flex-col gap-5">
      <motion.p
        variants={textVariants}
        className="text-white/50 lg:pt-[160px] pt-[100px] text-[16px] font- uppercase"
        style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
        <Link href={"/"}>Home</Link> / News Details
        <span
          className="font-bold text-primary"
          style={{ fontFamily: "var(--font-urbanist), sans-serif" }}>
          {" "}
        </span>
      </motion.p>

      <section className="flex flex-col gap-10 mb-10">
        <h1 className="text-[50px] font-[900]">{data?.data.title}</h1>
        <div className="w-full lg:h-[40em] h-[20em] relative">
          <Image
            src={data?.data?.images[0]}
            alt={data?.data?.altTag}
            className="object-cover w-full h-full absolute object-center"
            width={1500}
            height={1500}
          />
        </div>

        <div className="grid md:grid-cols-6 md:gap-20 gap-6">
          <div className="p-14 bg-[#F2F2F2] md:col-span-2 col-span-6 rounded-xl h-[420px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <label className="text-[#FE6601] uppercase font-[800]">
                  POSTED ON
                </label>
                <p>{moment(data?.data.date).format("D MMM YYYY")}</p>
                <div>
                  <hr></hr>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <label className="text-[#FE6601] uppercase font-[800]">
                  TAGS
                </label>
                <div className="flex gap-1">
                  {data?.data.tags.map((item, index) => (
                    <p key={index}>
                      {index === data?.data.tags.length - 1
                        ? item
                        : item + ", "}
                    </p>
                  ))}
                </div>
                <div>
                  <hr></hr>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="uppercase font-[800] text-[#FE6601] flex gap-2 items-center">
                  {/* <Image src={shareIcon} alt="share-icon" /> Share article */}
                  <ShareArticle />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 col-span-6">
            {/* {data?.data.description.split('</p>').slice(0, 2).map((para, index) => (
              <>
                <p key={index}>{para+"</p>"}</p><br />
              </>
            ))}
            <h4 className='text-[22px] font-[660]'>What Is Vocal Toning</h4><br />
            {data?.data.description.split('</p>').slice(2).map((para, index) => (
              <>
                {index == 2 ?

                  <><br /><Image src={paraImage} alt='para-image' key={index} /><br /><br /><p>{para}</p><br /></>

                  :

                  <><p key={index}>{para}</p><br /></>}

              </>
            ))} */}
            {parse(data?.data.description || "")}

            <section className="mt-5">

              <div className="grid grid-cols-2 gap-2 w-full">
                {data?.data.gallery.map((item, index) => (
                  <div key={index} className="h-[240px] w-full relative">
                    <Image
                      key={index}
                      src={item}
                      alt={data?.data.altTag}
                      className="object-cover w-full h-full absolute object-center"
                      width={1500}
                      height={1500}
                    />
                  </div>
                ))}

              </div>
            </section>

          </div>

        </div>
      </section>

    </div>
  );
};

export default NewsDetails;
