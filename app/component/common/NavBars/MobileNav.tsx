import React, { useState } from 'react'
import { menuItems } from './data'
import Image from 'next/image'

const MobileNav = () => {

    const [activeDropdown,setActiveDropdown] = useState<number | null>(null)

    return (
        <>
         <nav className="w-full bg-white/80 backdrop-blur-[10px] shadow-md py-4 absolute top-0 z-10">
                <div className="container mx-auto flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="/Logo.svg"
                      alt="Crest Logo"
                      width={80}
                      height={50}
                      className="h-[50px] w-auto"
                    />
                  </div>
               
                  </div>
                  </nav>
                     <label className="absolute top-4 right-4 z-50 cursor-pointer px-3 py-6" htmlFor="mobile-menu">
                     <input className="peer hidden" type="checkbox" id="mobile-menu" />
                     <div
                         className="relative z-50 block h-[1px] w-7 bg-black content-[''] 
                 before:absolute before:top-[-0.35rem] before:block before:h-full before:w-full before:bg-black before:transition-all before:duration-200 before:ease-out before:content-[''] 
                 after:absolute after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-black after:transition-all after:duration-200 after:ease-out after:content-[''] 
                 peer-checked:bg-transparent before:peer-checked:top-0 before:peer-checked:w-full before:peer-checked:rotate-45 before:peer-checked:transform 
                 after:peer-checked:bottom-0 after:peer-checked:w-full after:peer-checked:-rotate-45 after:peer-checked:transform"
                     ></div>
         
                     {/* Overlay */}
                     <div className="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-sm peer-checked:block"></div>
         
                     {/* Sliding Menu */}
                     <div
                         className="fixed top-0 right-0 z-40 h-full w-[75%] translate-x-full overflow-y-auto transition-transform duration-500 peer-checked:translate-x-0 bg-white shadow-2xl w-[300px]"
                     >
                         <div className="min-h-full px-6 pt-[100px]">
                             <ul className='flex flex-col gap-3'>
                                 {menuItems.map((item,index)=>(
                                     item.children ? (
                                         <li key={index}>
                                            <ul>
                                             <li onClick={()=>setActiveDropdown(index)}><a href="#">{item.title}</a></li>
                                             <ul>
                                             {activeDropdown == index && item.children.map((childItem,index)=>(
                                                 <li key={index} className='pl-2'><a href="#">{childItem.title}</a></li>
                                             ))}
                                             </ul>
                                             </ul>
                                         </li>
                                     ) 
                                     
                                     : 
                                     
                                     (
                                         <li key={index}><a href="#">{item.title}</a></li>
                                     )
                                 ))}
                                 
                                 
                             </ul>
                         </div>
                     </div>
                 </label>
                 </>
    )
}

export default MobileNav