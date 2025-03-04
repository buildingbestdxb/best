"use client"

import React from 'react'
import SecHr from '../common/SecDivider/SecHr'
import { AboutType } from '@/app/types/AboutType'
import parse from 'html-react-parser'



const WhoWeare = ({data}:{
  data:AboutType
}) => {


    return (
        <>
            <section className='wwebanner'>
          <div className='container'>
            <div className='py-12 md:py-15 lg:py-[150px]'>

                <SecHr title="WHO WE ARE" />
              <div className="grid grid-cols-[100%] lg:grid-cols-[34%_66%] gap-0 md:gap-4 pt-3 md:pt-10">
                <div className=""></div>
                <div className='text-md lg:text-lg text-secondary/60 leading-[1.4] font-medium'>
                  {parse(data?.data[0].who_we_are || "")}
                </div>
              </div>

            </div>
          </div>

            </section>

        </>
    )
}

export default WhoWeare