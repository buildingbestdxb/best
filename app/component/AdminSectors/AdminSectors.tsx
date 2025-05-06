"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialogue-box'
import { Label } from '@/components/ui/label'
import { ImageUploader } from '@/components/ui/image-uploader'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Values {
    bannerImage:string;
    name:string;
    image: string;
    icon:string;
    bannerAlt:string;
    imageAlt:string;
    iconAlt:string;
    metaTitle:string;
    metaDescription:string;
}

const AdminSectors = () => {

        const {
            register,
            setValue,
            reset,
            watch,
            getValues,
            formState: {},
        } = useForm<Values>();


        const [sectors, setSectors] = useState<{bannerImage:string,name:string;image:string;icon:string,_id:string;bannerAlt:string;imageAlt:string;iconAlt:string,metaTitle:string,metaDescription:string}[]>([])
        const [oldName,setOldName] = useState("")


const handleAddSector = async() =>{
    try {
        const formData = new FormData()
        formData.append("bannerImage",getValues("bannerImage"))
        formData.append("name",getValues("name"))
        formData.append("image",getValues("image") ?? "")
        formData.append("icon",getValues("icon") ?? "")
        formData.append("bannerAlt",getValues("bannerAlt") ?? "")
        formData.append("imageAlt",getValues("imageAlt") ?? "")
        formData.append("iconAlt",getValues("iconAlt") ?? "")
        formData.append("metaTitle",getValues("metaTitle"))
        formData.append("metaDescription",getValues("metaDescription"))
        const response = await fetch('/api/admin/sector',{
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
        const response = await fetch('/api/admin/sector')
        if(response.ok){
            const data = await response.json()
            setSectors(data.data)
        }
    } catch (error) {
        console.log("Failed to fetch data:",error)
    }
}


const handleSetEditRegion = async(bannerImage:string,name:string,image:string,icon:string,bannerAlt:string,imageAlt:string,iconAlt:string,metaTitle:string,metaDescription:string) =>{
    setOldName(name)
    setValue("bannerImage",bannerImage)
    setValue("name",name)
    setValue("image",image)
    setValue("icon",icon)
    setValue("bannerAlt",bannerAlt)
    setValue("imageAlt",imageAlt)
    setValue("iconAlt",iconAlt)
    setValue("metaTitle",metaTitle)
    setValue("metaDescription",metaDescription)
}


const handleEditSector = async(id:string) =>{
    try {
        const formData = new FormData()
        formData.append("bannerImage",getValues("bannerImage"))
        formData.append("name",getValues("name"))
        formData.append('oldName',oldName)
        formData.append("image",getValues("image") ?? "")
        formData.append("icon",getValues("icon") ?? "")
        formData.append("bannerAlt",getValues("bannerAlt") ?? "")
        formData.append("imageAlt",getValues("imageAlt") ?? "")
        formData.append("iconAlt",getValues("iconAlt") ?? "")
        formData.append("metaTitle",getValues("metaTitle"))
        formData.append("metaDescription",getValues("metaDescription"))
        const response = await fetch(`/api/admin/sector?id=${id}`,{
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

const handleDeleteSector = async(id:string) =>{
    try {
        const response = await fetch(`/api/admin/sector?id=${id}`,{
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


    useEffect(()=>{
        fetchData()
    },[])





  return (
    <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
        <div className='text-3xl font-bold'>Sectors</div>
                <Dialog>
                        <DialogTrigger onClick={()=>reset()}>Add Sector</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Sector</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[400px] overflow-y-auto'>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Name</Label>
                                        <Input {...register("name")} />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Icon</Label>
                                        <ImageUploader value={watch("icon")} onChange={(url)=>setValue("icon",url)}/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Icon Alt</Label>
                                        <Input {...register("iconAlt")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Banner Image</Label>
                                        <ImageUploader value={watch("bannerImage")} onChange={(url)=>setValue("bannerImage",url)}/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Banner Alt</Label>
                                        <Input {...register("bannerAlt")} />
                                        </div> 
                                    </div>
                                    
                                    <div className='flex flex-col gap-2'>
                                        <Label>Image</Label>
                                        <ImageUploader value={watch("image")} onChange={(url)=>setValue("image",url)}/>
                                    </div> 

                                    <div className='flex flex-col gap-2'>
                                        <Label>Image Alt</Label>
                                        <Input {...register("imageAlt")} />
                                        </div> 

                                        <div className='flex flex-col gap-2'>
                                        <Label>Meta Title</Label>
                                        <Input {...register("metaTitle")} />
                                        </div> 

                                        <div className='flex flex-col gap-2'>
                                        <Label>Meta Description</Label>
                                        <Input {...register("metaDescription")} />
                                        </div>  
                                                                  
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose onClick={handleAddSector}>Save</DialogClose>
                        </DialogContent>
                    </Dialog>

        </div>
        <div className='p-2 h-screen overflow-y-scroll flex flex-col gap-5'>
            {sectors && sectors.map((item)=>(
                <div className='flex justify-between bg-orange-300 p-2 rounded-lg items-center' key={item._id}>
                <h4>{item.name}</h4>
                <div>
                    <Dialog>
                        <DialogTrigger onClick={()=>handleSetEditRegion(item.bannerImage,item.name,item.image,item.icon,item.bannerAlt,item.imageAlt,item.iconAlt,item.metaTitle,item.metaDescription)}>Edit</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit sector details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2 h-[400px] overflow-y-auto'>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Name</Label>
                                        <Input {...register("name")} />
                                    </div>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Icon</Label>
                                        <ImageUploader value={watch("icon")} onChange={(url)=>setValue("icon",url)}/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Icon Alt</Label>
                                        <Input {...register("iconAlt")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Banner Image</Label>
                                        <ImageUploader value={watch("bannerImage")} onChange={(url)=>setValue("bannerImage",url)}/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                        <Label>Banner Alt</Label>
                                        <Input {...register("bannerAlt")} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Image</Label>
                                        <ImageUploader value={watch("image")} onChange={(url)=>setValue("image",url)}/>
                                    </div> 
                                    <div className='flex flex-col gap-2'>
                                        <Label>Image Alt</Label>
                                        <Input {...register("imageAlt")} />
                                        </div>  

                                        <div className='flex flex-col gap-2'>
                                        <Label>Meta Title</Label>
                                        <Input {...register("metaTitle")} />
                                        </div> 

                                        <div className='flex flex-col gap-2'>
                                        <Label>Meta Description</Label>
                                        <Input {...register("metaDescription")} />
                                        </div> 

                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose onClick={()=>handleEditSector(item._id)}>Save</DialogClose>
                        </DialogContent>
                    </Dialog>
                    <Button className='bg-transparent hover:bg-transparent border-none shadow-none font-light text-sm' onClick={()=>handleDeleteSector(item._id)}>Delete</Button>
                </div>
               
            </div>
            ))}
            
        </div>
    </div>
  )
}

export default AdminSectors