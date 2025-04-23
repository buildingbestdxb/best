"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ImageUploader } from '@/components/ui/image-uploader'



interface AboutFormData {
  bannerImage:string;
  who_we_are: string;
  values_and_expertise: string;
  core_value_title:string;
  core_value_content: string;
  core_value_image:string;
  strength_and_vision_content: string;
  strength_and_vision_image:string;
}

const AdminAbout = () => {

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AboutFormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [cards,setCards] = useState([])
  const [clients,setClients] = useState([])
  const [histories,setHistories] = useState([])


  const onSubmit = async(data:AboutFormData) => {
    try {
          setIsLoading(true);
            
          const response = await fetch(`/api/admin/about/intro`, {
              method: "PATCH",
              body: JSON.stringify(data),
            });

          if(response.ok){
            const data = await response.json()
            alert(data.message)
          }
          
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
  }

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await fetch('/api/admin/about/intro')
        if(response.ok){
          const data = await response.json()
          console.log(data)
          setValue("bannerImage",data.data[0].bannerImage)
          setValue("who_we_are",data.data[0].who_we_are)
          setValue("core_value_content",data.data[0].core_value.content)
          setValue("core_value_title",data.data[0].core_value.title)
          setValue("core_value_image",data.data[0].core_value.image)
          setCards(data.data[0].core_value.cards)
          setValue("strength_and_vision_content",data.data[0].strength_and_vision.content)
          setValue("strength_and_vision_image",data.data[0].strength_and_vision.image)
          setClients(data.data[0].strength_and_vision.clients)
          setHistories(data.data[0].history)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

  },[])


  return (
    <div className='flex flex-col gap-5'>
      <div className='text-3xl font-bold'>About Page</div>
      <div className='flex flex-col gap-5'>
        <form className='border-dashed border-2 p-4 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          
          <div className='flex justify-end'>
            <Button type='submit' disabled={isLoading}>Save</Button>
          </div>
          
          <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Banner Image
            </Label>
            <ImageUploader value={watch("bannerImage")} onChange={(url) => setValue("bannerImage", url)} />
          </div>

          <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Who we are
            </Label>

          <Controller
            name="who_we_are"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
            )}
          />
          </div>
          {errors.who_we_are && <p className="mt-1 text-sm text-red-600">{errors.who_we_are.message}</p>}
        </form>

        <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
          <div className='flex justify-between'>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Core Values & Expertise
              </Label>
              <Link href={'/admin/about/values'}><Button>Modify Section</Button></Link>
          </div>
          <div className='grid grid-cols-3 gap-5'>
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </Label>
              <Input value={watch("core_value_title")} readOnly/>
            </div>

            <div className='col-span-1'>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Content
              </Label>
              <Controller
                name="core_value_content"
                control={control}
                render={({ field }) => (
                  <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                )}
              />
            </div>
            <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Image
              </Label>
              <Image src={watch("core_value_image")} alt='image' width={200} height={400}/>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h4 className='font-bold'>Cards</h4>
            <div className='grid grid-cols-5 gap-5'>
              {cards && cards.map((item:{title:string;logo:string;},index)=>(
                <div key={index}>
                <Image src={item.logo} alt='image' width={200} height={200}/>
                <Input
                  // {...register("title", { required: "Title is required" })}
                  type="text"
                  value={item.title}
                  id="title"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  readOnly
                />
              </div>
              ))}
              
            </div>
          </div>
        </div>

        <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
          <div className='flex justify-between'>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Strength & Vision
              </Label>
              <Link href={'/admin/about/strength-and-vision'}><Button>Modify Section</Button></Link>
          </div>
            
        <div className='grid grid-cols-2 gap-5'>
            <div className='col-span-1'>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Content
              </Label>
              <Controller
                name="strength_and_vision_content"
                control={control}
                render={({ field }) => (
                  <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                )}
              />
            </div>
            <div>
            <Image src={watch("strength_and_vision_image")} alt='image' width={200} height={400}/>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <h4 className='font-bold'>Clients</h4>
            <div className='grid grid-cols-5'>
              {clients && clients.map((item:{logo:string},index)=>(
                <div key={index}>
                  <Image src={item.logo} alt='image' width={200} height={200}/>
                </div>
              ))}
              
            </div>
          </div>
          </div>


          <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
            <div className='flex justify-between'>
              <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                History
              </Label>
              <Link href={'/admin/about/history'}><Button>Modify Section</Button></Link>
            </div>
            
              {histories && histories.map((item:{year:string;image:string;},index)=>(
                <div className='grid grid-cols-2 gap-5 border-2 p-4' key={index}>
                <div>
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Year
                    </Label>
                <Input
                        // {...register("title", { required: "Title is required" })}
                        type="text"
                        id="title"
                        readOnly
                        value={item.year}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                      />
                </div>
      
                  <div>
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Image
                    </Label>
                    <Image src={item.image} alt='image' width={200} height={200}/>
                  </div>
                </div>
              ))}
        
          </div>

      </div>
    </div>
  )
}

export default AdminAbout