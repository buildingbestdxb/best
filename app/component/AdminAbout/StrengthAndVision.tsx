"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialogue-box"
import { ImageUploader } from '@/components/ui/image-uploader'
import { DialogClose } from '@radix-ui/react-dialog'
import Image from 'next/image'


interface Values {
    content: string;
    image: string;
    cardTitle: string;
    clientLogo: string;
}

const StrengthAndVision = () => {

    const {
        control,
        watch,
        setValue,
        getValues,
        formState: {},
    } = useForm<Values>({
        defaultValues: {
          content: "",
          image: "",
          cardTitle: "",
          clientLogo: ""
        }
      });

    const [cards,setCards] = useState([])

    const handleEditClient = async(id:string) =>{
        try {
            const formData = new FormData()
            formData.append("clientLogo",getValues("clientLogo"))
            
            const response = await fetch(`/api/admin/about/strength-and-vision/clients?id=${id}`, {
                method: "PATCH",
                body: formData,
              });
  
            if(response.ok){
              const data = await response.json()
              alert(data.message)
              fetchData()
            }
            
          } catch (error) {
            console.error(error);
          }
    }


    const fetchData = async() =>{
        try {
            const response = await fetch(`/api/admin/about/strength-and-vision`, {
                method: "GET",
              });
  
            if(response.ok){
              const data = await response.json()
              console.log(data)
              setValue("content",data.data[0].strength_and_vision.content)
              setValue("image",data.data[0].strength_and_vision.image ?? "")
              setCards(data.data[0].strength_and_vision.clients)
            }
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleSetEditClient = (logo:string) =>{
        setValue("clientLogo",logo)
    }

    const onSubmitForm = async(e:FormEvent) =>{
        console.log("here triggered")
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("content",getValues("content"))
            formData.append("image",getValues("image"))

            const response = await fetch(`/api/admin/about/strength-and-vision`, {
                method: "PATCH",
                body:formData
              });
  
            if(response.ok){
              const data = await response.json()
              alert(data.message)
              fetchData()
            }
          } catch (error) {
            console.error(error);
          }
    }

const handleSetAddClient = () =>{
    setValue("clientLogo","")
}

const handleAddClient = async() =>{
    try {
        const formData = new FormData()
        formData.append("clientLogo",getValues("clientLogo"))

        const response = await fetch(`/api/admin/about/strength-and-vision/clients`, {
            method: "POST",
            body:formData
          });

        if(response.ok){
          const data = await response.json()
          alert(data.message)
          fetchData()
        }
      } catch (error) {
        console.error(error);
      }
}


const handleDeleteClient = async(id:string) =>{
    try {

        const response = await fetch(`/api/admin/about/strength-and-vision/clients?id=${id}`, {
            method: "DELETE",
          });

        if(response.ok){
          const data = await response.json()
          alert(data.message)
          fetchData()
        }
        
      } catch (error) {
        console.error(error);
      }
}

    return (
        <div className='flex flex-col gap-5'>
            <form className='border-dashed border-2 p-4 flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Strength And Vision
                    </Label>
                    <Button type='submit' onClick={(e)=>onSubmitForm(e)}>Save</Button>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='col-span-1'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Content
                        </Label>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                            )}
                        />
                    </div>

                    <div className='col-span-1'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Image
                        </Label>
                        <ImageUploader value={watch("image")} onChange={(url) => setValue("image", url)} />
                    </div>

                </div>
            </form>

            <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <Label>Clients</Label>
                    <Dialog>
                            <DialogTrigger onClick={handleSetAddClient}>Add Client</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit client content</DialogTitle>
                                    <DialogDescription>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Logo</Label>
                                            <ImageUploader value={watch("clientLogo")} onChange={(url) => setValue("clientLogo", url)} />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose onClick={handleAddClient}>Save</DialogClose>
                            </DialogContent>
                        </Dialog>
                </div>
                <div className='grid grid-cols-5 gap-5'>
                {cards && cards.map((item:{title:string;logo:string;_id:string},index)=>(
                    <div className='border-dashed border-2 p-4 flex flex-col gap-5' key={index}>
                    <div className='grid grid-cols-1 gap-5'>
                        <div>
                            <Label>Logo</Label>
                            <Image src={item.logo} alt='logo' width={50} height={50}/>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <Dialog>
                            <DialogTrigger onClick={()=>handleSetEditClient(item.logo)}>Edit</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit client content</DialogTitle>
                                    <DialogDescription>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Logo</Label>
                                            <ImageUploader value={watch("clientLogo")} onChange={(url) => setValue("clientLogo", url)} />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose onClick={()=>handleEditClient(item._id)} type='button'>Save</DialogClose>
                            </DialogContent>
                        </Dialog>
                        <Button className='bg-transparent border-none shadow-none hover:bg-transparent font-light' type="button" onClick={()=>(handleDeleteClient(item._id))}>Delete</Button>
                    </div>
                </div>
                ))}
                </div>
                
            </div>
        </div>
    )
}

export default StrengthAndVision