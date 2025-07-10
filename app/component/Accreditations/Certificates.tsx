"use client";
import React, { useEffect,useState  } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useSWR from "swr";
import { Accreditation } from "@/app/types/AccreditationType";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
const Certificates = () => {
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data }: { data: Accreditation } = useSWR(
    `/api/admin/accreditation`,
    fetcher
  );
  const [isOpen, setIsOpen] = useState(false); 
 

 
  useEffect(() => {
    // console.log(data?.data[0].files[0].file)
    // console.log(data);
  }, [data]); 
  const [openCertificateId, setOpenCertificateId] = useState<string | null>(null);
  useEffect(() => {
    if (openCertificateId !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    return () => {
      setIsOpen(false);
    };
  }, [openCertificateId]);

  return (
    <motion.section
      className="section-spacing overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="container">
        <div className=" ">
          <div className="flex flex-col  gap-4 lg:gap-10 leading-none mb-20">
            <h2 className="text-lg  font-bold uppercase text-black">
              Our Certificates
            </h2>
            <p className="text-sm text-secondary/75 max-w-[90ch] leading-[1.4]">
              Our Certificates highlight our commitment to quality, safety, and
              industry standards and our dedication to excellence and
              compliance.
            </p>
          </div>

          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[10px] md:gap-[15px] lg:gap-[30px] xl:gap-[60px] items-center mt-5 lg:mt-[60px]">
              {data?.data.map((sector, index) => (
                <div
                key={sector._id}>
                <motion.div
                  className="relative h-[300px] lg:h-[663px] overflow-hidden rounded-custom shadow-lg group cursor-pointer aftre"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setOpenCertificateId(sector._id)}
                >
                  <Image
                    src={sector.files[0].thumbnail}
                    alt="Background Image"
                    fill
                    className="object-cover"
                    onClick={() => setOpenCertificateId(sector._id)}
                  />

                  <motion.div
                    className="absolute z-[1] flex flex-col inset-x-[10px] xxl:inset-x-[20px] bottom-[10px] xxl:bottom-[20px] p-[10px] xxl:p-[20px] backdrop-blur-[10px] bg-white/10 text-white rounded-custom gap-[20px] group-hover:bg-primary transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    onClick={() => setOpenCertificateId(sector._id)}
                  >
                    <motion.div
                      className="flex justify-between items-center w-full group"
                      whileHover={{ opacity: 1 }}
                    >
                      <h4 className="text-sm font-semibold text-white transition-opacity duration-500">
                        {sector.title}
                      </h4>
                      <div className="flex items-center">
                        <div className="w-[8px] h-[8px] bg-primary rounded-full transition-opacity duration-500 opacity-100 group-hover:opacity-0"></div>
                         <Image
                          src="/assets/img/icons/arwtp.svg"
                          alt=""
                          width={0}
                          height={0}
                          className="transition-all duration-500 ease-in-out group-hover:w-[14px]"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
               
                {openCertificateId === sector._id && isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-[80%] h-[80%] bg-white rounded-lg shadow-lg overflow-hidden">
                      <button
              className="absolute top-2 right-5 text-black hover:text-red-600 text-2xl font-bold z-[1] "
              onClick={() => setOpenCertificateId(null)}
                      >
              &times;
                      </button>

            <div className="w-full h-full">
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer fileUrl={sector.files[0].file} />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </div>
                 
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Certificates;
