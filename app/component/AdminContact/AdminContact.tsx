"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialogue-box'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Link from 'next/link'
import { ImageUploader } from '@/components/ui/image-uploader'
import { generateDimentions } from '@/lib/generateDimentions'


interface Values {
    bannerImage:string;
    region:string;
    phone: string;
    fax: string;
    mail: string;
    address_card: string;
    address: string;
    metaTitle: string;
    metaDescription: string;
    bannerAlt: string;
    map: string;
}


const AdminContact = () => {

    const {
        register,
        control,
        setValue,
        reset,
        watch,
        getValues,
        formState: {},
    } = useForm<Values>();

    const [regions,setRegions] = useState([])
    const [enquiries,setEnquiries] = useState<{name:string;email:string;subject:string;message:string}[]>([])

    const handleAddRegion = async() =>{
        try {
            const formData = new FormData()
            formData.append("region",getValues("region"))
            formData.append("phone",getValues("phone"))
            formData.append("fax",getValues("fax"))
            formData.append("mail",getValues("mail"))
            formData.append("address_card",getValues("address_card"))
            formData.append("address",getValues("address"))
            formData.append("map",getValues("map"))
            const response = await fetch('/api/admin/contact',{
                method:"POST",
                body:formData
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async() =>{
        try {
            const response = await fetch('/api/admin/contact')
            if(response.ok){
                const data = await response.json()
                setRegions(data.data)
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }

    const fetchEnquiry = async() =>{
        try {
            const response = await fetch('/api/admin/contact/enquiry')
            if(response.ok){
                const data = await response.json()
                if(data.data){
                    setEnquiries(() => [...data.data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0,3));
                }
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }


    const fetchBanner = async() =>{
        try {
            const response = await fetch('/api/admin/contact/banner')
            if(response.ok){
                const data = await response.json()
                if(data.data){
                    setValue("bannerImage",data.data[0].image)
                    setValue("bannerAlt",data.data[0].alt)
                }
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }

    useEffect(()=>{
        fetchData()
        fetchEnquiry()
        fetchBanner()
        fetchMeta()
    },[])


    const handleSetAddRegion = () =>{
        reset()
    }

    const handleSetEditRegion = (region:string,phone:string,fax:string,mail:string,address_card:string,address:string,map:string) =>{
        setValue("region",region)
        setValue("phone",phone)
        setValue("fax",fax)
        setValue("mail",mail)
        setValue("address_card",address_card)
        setValue("address",address)
        setValue("map",map)
    }

    const handleEditRegion = async(id:string) =>{
        try {
            const formData = new FormData()
            formData.append("region",getValues("region"))
            formData.append("phone",getValues("phone"))
            formData.append("fax",getValues("fax"))
            formData.append("mail",getValues("mail"))
            formData.append("address_card",getValues("address_card"))
            formData.append("address",getValues("address"))
            formData.append("map",getValues("map"))
            const response = await fetch(`/api/admin/contact?id=${id}`,{
                method:"PATCH",
                body:formData
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleDeleteRegion = async(id:string) =>{
        try {
            const response = await fetch(`/api/admin/contact?id=${id}`,{
                method:"DELETE",
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBannerSave = async() =>{
        try {
            const formData = new FormData()
            formData.append("bannerImage",getValues("bannerImage"))
            formData.append("bannerAlt",getValues("bannerAlt"))
            formData.append("pageName","contact")
            const response = await fetch(`/api/admin/contact/banner`,{
                method:"PATCH",
                body:formData
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchBanner()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleMetaSave = async() =>{
        try {
            const formData = new FormData()
            formData.append("metaTitle",getValues("metaTitle"))
            formData.append("metaDescription",getValues("metaDescription"))
            const response = await fetch(`/api/admin/contact/meta`,{
                method:"PATCH",
                body:formData
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchBanner()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchMeta = async() =>{
        try {
            const response = await fetch('/api/admin/contact/meta')
            if(response.ok){
                const data = await response.json()
                if(data){
                    setValue("metaTitle",data.contact.metaTitle)
                    setValue("metaDescription",data.contact.metaDescription)
                }
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='text-3xl font-bold'>Contact</div>
            <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                                <div className='flex justify-between'>
                                    <div>Meta Section</div>
                                    <Button onClick={handleMetaSave}>Save</Button>
                                </div>
                                <div>
                                    <Label>Meta Title</Label>
                                    <Input {...register("metaTitle")} />
                                </div>
                                <div>
                                    <Label>Meta Description</Label>
                                    <Input {...register("metaDescription")} />
                                </div>
                            </div>
            <div className='flex flex-col gap-5'>
                <div>
                    <div className='flex justify-between mb-5'>
                        <h2 className='font-bold'>Banner Image</h2>
                        <Button onClick={handleBannerSave}>Save Banner</Button>
                    </div>
                    <ImageUploader value={watch('bannerImage')} onChange={(url)=>setValue("bannerImage",url)}/>
                    <p className='text-xs text-gray-500'>{generateDimentions("contact", "banner")}</p>
                    <Label>Banner Alt</Label>
                    <Input {...register("bannerAlt")} />
                </div>

                <div className='flex justify-between'>
                    <h2 className='font-bold'>Regions</h2>
                    <Dialog>
                        <DialogTrigger onClick={handleSetAddRegion}>Add Region</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add region details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                        <Label>Region</Label>
                                        <Input {...register("region")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Phone</Label>
                                        <Input {...register("phone")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Fax</Label>
                                        <Input {...register("fax")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Mail</Label>
                                        <Input {...register("mail")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Address Card</Label>
                                        <Input {...register("address_card")} />
                                    </div>
                                    <div className='col-span-1'>
                                        <Label htmlFor="title">
                                            Address
                                        </Label>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => (
                                                <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                                            )}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Map</Label>
                                        <Input {...register("map")} />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose onClick={handleAddRegion}>Save</DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className='h-[300px] border p-2 flex flex-col gap-4 overflow-y-scroll'>
                {regions && regions.map((item:{_id:string,region:string,phone:string,fax:string,mail:string,address_card:string,address:string,map:string})=>(
                    <div className='w-full bg-orange-300 p-4 rounded-lg flex justify-between items-center' key={item._id}>
                    <div>
                        {item.region}
                    </div>
                    <div className='flex gap-5'>
                    <Dialog>
                        <DialogTrigger onClick={()=>handleSetEditRegion(item.region,item.phone,item.fax,item.mail,item.address_card,item.address,item.map)}>Edit</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit region details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Phone</Label>
                                        <Input {...register("phone")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Fax</Label>
                                        <Input {...register("fax")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Mail</Label>
                                        <Input {...register("mail")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Address Card</Label>
                                        <Input {...register("address_card")} />
                                    </div>
                                    <div className='col-span-1'>
                                        <Label htmlFor="title">
                                            Address
                                        </Label>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => (
                                                <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                                            )}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Map</Label>
                                        <Input {...register("map")} />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose onClick={()=>handleEditRegion(item._id)}>Save</DialogClose>
                        </DialogContent>
                    </Dialog>
                    <Button className='bg-transparent hover:bg-transparent text-sm border-none shadow-none font-light' onClick={()=>handleDeleteRegion(item._id)}>Delete</Button>
                    </div>
                </div>
                ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                <div className='font-bold'>Enquiries</div>
                <Link href={'/admin/contact/enquiry'}>View All</Link>
                </div>
                <div className='border h-[200px] p-2 flex flex-col gap-2'>
                    {enquiries && enquiries.map((item:{name:string,email:string,subject:string,message:string},index)=>(
                        <div className='w-full bg-orange-300 p-4 rounded-lg flex justify-between items-center' key={index}>
                        <div>
                            {item.name}
                        </div>
                        <div className='flex gap-5'>
                        <Dialog>
                            <DialogTrigger>View</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Details</DialogTitle>
                                    <DialogDescription className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Name</Label>
                                            <Input value={item.name} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Email</Label>
                                            <Input value={item.email} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Subject</Label>
                                            <Input value={item.subject} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Message</Label>
                                            <textarea value={item.message} readOnly></textarea>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose>Close</DialogClose>
                            </DialogContent>
                        </Dialog>
                        {/* <Button className='bg-transparent hover:bg-transparent text-sm border-none shadow-none font-light'>Delete</Button> */}
                        </div>
                    </div>
                    ))}
                
                </div>
            </div>
        </div>
    )
}

export default AdminContact