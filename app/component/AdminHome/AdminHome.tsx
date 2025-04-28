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




interface AboutFormData {
    pageHeading: string;
    about_title: string;
    about_content: string;
    about_image: string;
    sectors_title: string;
    sectors_description: string;
    quality_title: string;
    quality_description: string;
    mission: string;
    vision: string;
    location: string;
    contact: string;
    metaTitle: string;
    metaDescription: string;
}

const AdminHome = () => {

    const {
        handleSubmit,
        control,
        watch,
        register,
        setValue,
        formState: { errors },
    } = useForm<AboutFormData>();

    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([])


    const onSubmit = async (data: AboutFormData) => {
        try {
            setIsLoading(true);

            const response = await fetch(`/api/admin/home`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin/home')
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setValue("pageHeading", data.data[0].pageHeading)
                    setValue("about_title", data.data[0].about.title)
                    setValue("about_content", data.data[0].about.content)
                    setValue("about_image", data.data[0].about.image)
                    setCards(data.data[0].about.cards)
                    setValue("sectors_title", data.data[0].sectorHeading)
                    setValue("sectors_description", data.data[0].sectorDescription)
                    setValue("quality_title", data.data[0].qualityHeading)
                    setValue("quality_description", data.data[0].qualityDescription)
                    setValue("mission", data.data[0].mission)
                    setValue("vision", data.data[0].vision)
                    setValue("location", data.data[0].location)
                    setValue("contact", data.data[0].contact)
                    setValue("metaTitle", data.data[0].metaTitle)
                    setValue("metaDescription", data.data[0].metaDescription)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])

    const handleMetaSave = async () => {
        try {
            const response = await fetch(`/api/admin/home/meta`, {
                method: "POST",
                body: JSON.stringify({
                    metaTitle: watch("metaTitle"),
                    metaDescription: watch("metaDescription"),
                }),
            });

            if (response.ok) {
                const data = await response.json()
                alert(data.message)
            }

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='flex flex-col gap-5'>
            <div className='text-3xl font-bold'>Home Page</div>
            <div className='flex flex-col gap-5'>
                
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
                
                <form className='border-dashed border-2 p-4 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Page Title
                        </Label>
                        <Button type='submit' disabled={isLoading}>Save</Button>
                    </div>

                    <Input {...register("pageHeading", { required: "Page heading is required" })} />
                    {errors.pageHeading && <p className="mt-1 text-sm text-red-600">{errors.pageHeading.message}</p>}
                </form>

                <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            About Us
                        </Label>
                        <Link href={'/admin/home/about'}><Button>Modify Section</Button></Link>
                    </div>
                    <div className='grid grid-cols-3 gap-5'>
                        <div>
                            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </Label>
                            <Input value={watch("about_title")} readOnly />
                        </div>

                        <div className='col-span-1'>
                            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Content
                            </Label>
                            <Controller
                                name="about_content"
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
                            <Image src={watch("about_image")} alt='image' width={200} height={400} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-bold'>Cards</h4>
                        <div className='grid grid-cols-1 gap-5'>
                            {cards && cards.map((item: { title: string;number:string; logo: string; }, index) => (
                                <div key={index} className='bg-primary p-2 rounded-lg'>
                                    <Image src={item.logo} alt='image' width={50} height={50} />
                                    <div>
                                        <Input
                                            // {...register("title", { required: "Title is required" })}
                                            type="text"
                                            value={item.title}
                                            id="title"
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            readOnly
                                        />
                                        <Input
                                            // {...register("title", { required: "Title is required" })}
                                            type="text"
                                            value={item.number}
                                            id="title"
                                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                            readOnly
                                        />
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Sectors
                        </Label>
                        <Link href={'/admin/home/sectors'}><Button>Modify Section</Button></Link>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <div className='col-span-1'>

                            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </Label>
                            <Input value={watch("sectors_title")} />

                            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Description
                            </Label>
                            <Controller
                                name="sectors_description"
                                control={control}
                                render={({ field }) => (
                                    <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                                )}
                            />
                        </div>
                    </div>
                </div>


                <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Quality And Safety
                        </Label>
                        <Link href={'/admin/home/quality'}><Button>Modify Section</Button></Link>
                    </div>

                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </Label>
                    <Input value={watch("quality_title")} />

                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Description
                    </Label>
                    <Controller
                        name="quality_description"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                        )}
                    />

                </div>

                <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Mission & Vision
                        </Label>
                        <Link href={'/admin/home/mission'}><Button>Modify Section</Button></Link>
                    </div>

                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Mission
                    </Label>
                    <Controller
                        name="mission"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill theme="snow" readOnly value={field.value} onChange={field.onChange} className="mt-1" />
                        )}
                    />

                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Vision
                    </Label>
                    <Controller
                        name="vision"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill theme="snow" readOnly value={field.value} onChange={field.onChange} className="mt-1" />
                        )}
                    />

                </div>


                <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Location
                        </Label>
                        <Link href={'/admin/home/location'}><Button>Modify Section</Button></Link>
                    </div>

                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Description
                    </Label>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill theme="snow" readOnly value={field.value} onChange={field.onChange} className="mt-1" />
                        )}
                    />

                </div>

                <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Contact Us
                        </Label>
                        <Link href={'/admin/home/contact'}><Button>Modify Section</Button></Link>
                    </div>

                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Description
                    </Label>
                    <Controller
                        name="contact"
                        control={control}
                        render={({ field }) => (
                            <ReactQuill theme="snow" readOnly value={field.value} onChange={field.onChange} className="mt-1" />
                        )}
                    />

                </div>

            </div>
        </div>
    )
}

export default AdminHome