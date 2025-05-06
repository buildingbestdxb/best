"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Input } from '@/components/ui/input'
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
    year: string;
    content: string
    image: string;
    title:string;
    altTag:string;
}

const History = () => {

    const {
        register,
        control,
        watch,
        setValue,
        getValues,
        reset,
        formState: {},
    } = useForm<Values>({
        defaultValues: {
            content: "",
            image: "",
            year: "",
            title:""
        }
    });

    const [histories, setHistories] = useState([])

    const handleEditHistory = async (id: string) => {
        try {
            const formData = new FormData()
            formData.append("year", getValues("year"))
            formData.append("title", getValues("title"))
            formData.append("content", getValues("content"))
            formData.append("image", getValues("image"))
            formData.append("altTag", getValues("altTag"))
            const response = await fetch(`/api/admin/about/history?id=${id}`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
                fetchData()
            }

        } catch (error) {
            console.error(error);
        }
    }


    const fetchData = async () => {
        try {
            const response = await fetch(`/api/admin/about/history`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setHistories(data.data[0].history)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSetEditHistory = (year:string,title:string,content:string,image:string,altTag:string) => {
        setValue("year", year)
        setValue("title", title)
        setValue("content", content)
        setValue("image", image)
        setValue("altTag", altTag)
    }


    const handleSetAddHistory = () => {
        // setValue("year", "")
        // setValue("content", "")
        // setValue("image", "")
        reset()
    }

    const handleAddHistory = async () => {
        try {
            const formData = new FormData()
            formData.append("year", getValues("year"))
            formData.append("title", getValues("title"))
            formData.append("content", getValues("content"))
            formData.append("image", getValues("image"))
            formData.append("altTag", getValues("altTag"))
            const response = await fetch(`/api/admin/about/history`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
                fetchData()
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleDeleteHistory = async (id: string) => {
        try {

            const response = await fetch(`/api/admin/about/history?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
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
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>History</h1>
                        <Dialog>
                            <DialogTrigger onClick={handleSetAddHistory}>Add History</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add History</DialogTitle>
                                    <DialogDescription>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Image</Label>
                                            <ImageUploader value={watch("image")} onChange={(url) => setValue("image", url)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Alt Tag</Label>
                                            <Input {...register("altTag")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Year</Label>
                                            <Input {...register("year")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Title</Label>
                                            <Input {...register("title")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Content</Label>
                                            <Controller
                                                name="content"
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                                                )}
                                            />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose onClick={handleAddHistory}>Save</DialogClose>
                            </DialogContent>
                        </Dialog>
            </div>


            {histories && histories.map((item:{title:string;year:string;content:string;_id:string,image:string;altTag:string})=>(
                <div className='border-dashed border-2 p-4 flex flex-col gap-5' key={item._id}>
                
                <div className='flex justify-end'>
                    <div className='flex gap-5'>
                        <Dialog>
                            <DialogTrigger onClick={()=>handleSetEditHistory(item.year,item.title,item.content,item.image,item.altTag)}>Edit</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit History</DialogTitle>
                                    <DialogDescription>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Image</Label>
                                            <ImageUploader value={watch("image")} onChange={(url) => setValue("image", url)} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Alt Tag</Label>
                                            <Input {...register("altTag")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Year</Label>
                                            <Input {...register("year")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Title</Label>
                                            <Input {...register("title")} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Content</Label>
                                            <Controller
                                                name="content"
                                                control={control}
                                                render={({ field }) => (
                                                    <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1 h-32" />
                                                )}
                                            />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose onClick={()=>handleEditHistory(item._id)} className='mt-10'>Save</DialogClose>
                            </DialogContent>
                        </Dialog>
                        <Button className='bg-transparent border-none shadow-none hover:bg-transparent font-light' onClick={()=>handleDeleteHistory(item._id)}>Delete</Button>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='col-span-1'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Year
                        </Label>
                        <Input value={item.year} readOnly/>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </Label>
                        <Input value={item.title} readOnly/>
                    </div>

                    <div className='col-span-1'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Content
                        </Label>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <ReactQuill theme="snow" value={item.content} onChange={field.onChange} className="mt-1" readOnly/>
                            )}
                        />
                    </div>

                    <div className='col-span-1'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Image
                        </Label>
                        <Image src={item.image} alt='image' width={200} height={200}/>
                    </div>

                </div>
            </div>
            ))}
            
        </div>
    )
}

export default History