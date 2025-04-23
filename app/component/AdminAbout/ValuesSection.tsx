"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useEffect, useState } from 'react'
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
    title: string;
    content: string;
    image: string;
    cardTitle: string;
    cardLogo: string;
    seal: string;
}

const ValuesSection = () => {

    const {
        register,
        control,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<Values>({
        defaultValues: {
            content: "",
            image: "",
            cardTitle: "",
            cardLogo: ""
        }
    });

    const [cards, setCards] = useState([])
    const [seals, setSeals] = useState([])

    const handleEditCard = async (id: string) => {
        try {
            const formData = new FormData()
            formData.append("cardTitle", getValues("cardTitle"))
            formData.append("cardLogo", getValues("cardLogo"))

            const response = await fetch(`/api/admin/about/value/card?id=${id}`, {
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
            const response = await fetch(`/api/admin/about/value`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setValue("content", data.data[0].core_value.content)
                setValue("title", data.data[0].core_value.title)
                setValue("image", data.data[0].core_value.image)
                setCards(data.data[0].core_value.cards)
                setSeals(data.data[0].core_value.seals)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSetEditCard = (title: string, logo: string) => {
        setValue("cardTitle", title)
        setValue("cardLogo", logo)
    }

    const onSubmitForm = async (e: FormEvent) => {
        console.log("here triggered")
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("title", getValues("title"))
            formData.append("content", getValues("content"))
            formData.append("image", getValues("image"))

            const response = await fetch(`/api/admin/about/value`, {
                method: "PATCH",
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


    const handleSetAddSeal = () => {
        setValue("seal", "")
    }


    const handleAddSeal = async () => {
        try {
            const formData = new FormData()
            formData.append("seal", getValues("seal"))

            const response = await fetch(`/api/admin/about/value/seal`, {
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


    const handleDeleteSeal = async(id:string) =>{
        try {

            const response = await fetch(`/api/admin/about/value/seal?id=${id}`, {
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
            <form className='border-dashed border-2 p-4 flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Core Values & Expertise
                    </Label>
                    <Button type='submit' onClick={(e) => onSubmitForm(e)}>Save</Button>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    <div>
                        <Label>Title</Label>
                        <Input {...register("title", { required: "title is required" })} />
                    </div>
                    {errors.title && <span>{errors.title.message}</span>}
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

                <div className='grid grid-cols-2 gap-5'>

                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-between'>
                            <Label>Seals</Label>
                            <Dialog>
                                <DialogTrigger onClick={handleSetAddSeal}>Add</DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add seal</DialogTitle>
                                        <DialogDescription>
                                            <div className='flex flex-col gap-2'>
                                                <Label>Logo</Label>
                                                <ImageUploader value={watch("seal")} onChange={(url) => setValue("seal", url)} />
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogClose onClick={handleAddSeal}>Save</DialogClose>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {seals && seals.map((item:{logo:string;_id:string}) => (
                            <div className='border-dashed border-2 p-4 flex flex-col gap-5' key={item._id}>
                                <div className='flex justify-between items-center'>
                                    <div className=''>
                                        
                                        <Image src={item.logo} alt='logo' width={50} height={50} />
                                    </div>
                                    <div>
                                        <Button onClick={()=>handleDeleteSeal(item._id)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-between'>
                            <Label>Cards</Label>
                        </div>
                        {cards && cards.map((item: { title: string; logo: string; _id: string }, index) => (
                            <div className='border-dashed border-2 p-4 flex flex-col gap-5' key={index}>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <Label>Title</Label>
                                        <Input defaultValue={item.title} />
                                    </div>
                                    <div>
                                        <Label>Logo</Label>
                                        <Image src={item.logo} alt='logo' width={50} height={50} />
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <Dialog>
                                        <DialogTrigger onClick={() => handleSetEditCard(item.title, item.logo)}>Edit</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit card content</DialogTitle>
                                                <DialogDescription>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label>Logo</Label>
                                                        <ImageUploader value={watch("cardLogo")} onChange={(url) => setValue("cardLogo", url)} />
                                                        <Label>Title</Label>
                                                        <Input
                                                            {...register("cardTitle", { required: "Title is required" })}
                                                            type="text"
                                                            id="title"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogClose onClick={() => handleEditCard(item._id)}>Save</DialogClose>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ValuesSection