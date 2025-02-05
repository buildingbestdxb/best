import Image from 'next/image'
import React from 'react'
import map from '@/public/assets/img/home/map.svg'

const OurLocation = () => {
  return (
     <section className="py-16 md:px-12 relative overflow-hidden">
            <figure className="absolute top-0 left-0 h-full w-full -z-[1]">
                <Image src="/assets/img/home/qsbg.jpg" alt="" width={1920} height={800}/>
            </figure>
          <div className="container">
            <div className="flex items-center space-x-2 text-orange-500 text-sm font-medium">
              <span className="w-8 h-[2px] bg-orange-500"></span>
              <span>Our location</span>
            </div>
    
            <div className="grid md:grid-cols-2 gap-[10px] items-center mt-6">
              <div>
                <h2 className="text-lg font-bold text-white uppercase">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                </h2>
              </div>
              <div>
              <Image src={map} alt=''/>
              </div>
            </div>
          </div>
        </section>
  )
}

export default OurLocation