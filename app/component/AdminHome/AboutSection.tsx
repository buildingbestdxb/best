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
    altTag: string;
    cardTitle: string;
    cardNumber:string;
    cardLogo: string;
    seal: string;
    cardLogoAlt: string;
}

const AboutSection = () => {
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
            formData.append("cardNumber", getValues("cardNumber"))
            formData.append("cardLogo", getValues("cardLogo"))
            formData.append("cardLogoAlt",getValues("cardLogoAlt"))

            const response = await fetch(`/api/admin/home/about/card?id=${id}`, {
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
            const response = await fetch(`/api/admin/home/about`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setValue("content", data.data[0].about.content)
                setValue("title", data.data[0].about.title)
                setValue("image", data.data[0].about.image)
                setValue("altTag", data.data[0].about.altTag)
                setCards(data.data[0].about.cards)
                setSeals(data.data[0].about.seals)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSetEditCard = (title: string, logo: string,number:string,logoAlt:string) => {
        setValue("cardTitle", title)
        setValue("cardLogo", logo)
        setValue("cardNumber", number)
        setValue("cardLogoAlt", logoAlt)
    }

    const onSubmitForm = async (e: FormEvent) => {
        console.log("here triggered")
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("title", getValues("title"))
            formData.append("content", getValues("content"))
            formData.append("image", getValues("image"))
            formData.append("altTag", getValues("altTag"))

            const response = await fetch(`/api/admin/home/about`, {
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


    const handleSetAddSeal = () => {
        setValue("seal", "")
    }


    const handleAddSeal = async () => {
        try {
            const formData = new FormData()
            formData.append("seal", getValues("seal"))

            const response = await fetch(`/api/admin/home/about/seal`, {
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


    const handleDeleteSeal = async (id: string) => {
        try {

            const response = await fetch(`/api/admin/home/about/seal?id=${id}`, {
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
                        Content
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
                        <div>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Image
                        </Label>
                        <ImageUploader value={watch("image")} onChange={(url) => setValue("image", url)} />
                            <Label>Alt Tag</Label>
                            <Input {...register("altTag", { required: "Alt tag is required" })} />
                        </div>
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
                        {seals && seals.map((item: { logo: string; _id: string }) => (
                            <div className='border-dashed border-2 p-4 flex flex-col gap-5 bg-orange-300' key={item._id}>
                                <div className='flex justify-between items-center'>
                                    <div className=''>

                                        <Image src={item.logo} alt='logo' width={50} height={50} />
                                    </div>
                                    <div>
                                        <Button onClick={() => handleDeleteSeal(item._id)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-between'>
                            <Label>Cards</Label>
                        </div>
                        {cards && cards.map((item: { title: string; number: string; logo: string; _id: string; logoAlt: string }, index) => (
                            <div className='border-dashed border-2 p-4 flex flex-col gap-5 bg-orange-300' key={index}>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <div>
                                            <Label>Title</Label>
                                            <Input value={item.title} />
                                        </div>
                                        <div>
                                            <Label>Number</Label>
                                            <Input value={item.number} />
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Logo</Label>
                                        <Image src={item.logo} alt='logo' width={50} height={50} />
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <Dialog>
                                        <DialogTrigger onClick={() => handleSetEditCard(item.title, item.logo,item.number,item.logoAlt)}>Edit</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit card content</DialogTitle>
                                                <DialogDescription>
                                                    <div className='flex flex-col gap-2'>
                                                        <Label>Logo</Label>
                                                        <ImageUploader value={watch("cardLogo")} onChange={(url) => setValue("cardLogo", url)} />
                                                        <Label>Alt Tag</Label>
                                                        <Input {...register("cardLogoAlt")} />
                                                        <Label>Title</Label>
                                                        <Input
                                                            {...register("cardTitle", { required: "Title is required" })}
                                                            type="text"
                                                            id="title"
                                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                                        />

                                                        <Label>Number</Label>
                                                        <Input
                                                            {...register("cardNumber", { required: "Number is required" })}
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

export default AboutSection