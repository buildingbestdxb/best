"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialogue-box'
import { Label } from '@/components/ui/label'
import { ImageUploader } from '@/components/ui/image-uploader'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Values {
    name:string;
    image: string;
    icon:string;
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


        const [sectors, setSectors] = useState<{name:string;image:string;icon:string,_id:string}[]>([])
        const [oldName,setOldName] = useState("")


const handleAddSector = async() =>{
    try {
        const formData = new FormData()
        formData.append("name",getValues("name"))
        formData.append("image",getValues("image") ?? "")
        formData.append("icon",getValues("icon") ?? "")
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


const handleSetEditRegion = async(name:string,image:string,icon:string) =>{
    setOldName(name)
    setValue("name",name)
    setValue("image",image)
    setValue("icon",icon)
}


const handleEditSector = async(id:string) =>{
    try {
        const formData = new FormData()
        formData.append("name",getValues("name"))
        formData.append('oldName',oldName)
        formData.append("image",getValues("image") ?? "")
        formData.append("icon",getValues("icon") ?? "")
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
                                <DialogDescription className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Name</Label>
                                        <Input {...register("name")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Icon</Label>
                                        <ImageUploader value={watch("icon")} onChange={(url)=>setValue("icon",url)}/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Image</Label>
                                        <ImageUploader value={watch("image")} onChange={(url)=>setValue("image",url)}/>
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
                        <DialogTrigger onClick={()=>handleSetEditRegion(item.name,item.image,item.icon)}>Edit</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit sector details</DialogTitle>
                                <DialogDescription className='flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Name</Label>
                                        <Input {...register("name")} />
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Icon</Label>
                                        <ImageUploader value={watch("icon")} onChange={(url)=>setValue("icon",url)}/>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label>Image</Label>
                                        <ImageUploader value={watch("image")} onChange={(url)=>setValue("image",url)}/>
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