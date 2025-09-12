"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { RiDeleteBinLine } from "react-icons/ri";
import { VideoUploader } from '@/components/ui/video-uploader';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateDimentions } from '@/lib/generateDimentions';




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
    bannerSection: {
        items: {
            style: string,
            video: string;
            mainTitle: string;
            subTitle: string;
            poster: string;
            logo: string;
            logoAlt: string;
            imageAlt: string;
            image: string;
            cardText: string;
        }[];
    };
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

    const [cards, setCards] = useState([])


    const onSubmit = async (data: AboutFormData) => {
        try {

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
                    setValue("bannerSection.items", data.data[0].bannerSection.items)
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


    const { fields: bannerSectionItems, append: bannerSectionAppend, remove: bannerSectionRemove } = useFieldArray({
        control,
        name: "bannerSection.items"
    });


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
                    <div className='w-full flex justify-between'>
                        <Label className=''>Banner Section</Label>
                        <Button type='submit'>Save</Button>
                    </div>
                    <div className='p-5 rounded-md flex flex-col gap-5'>


                        {bannerSectionItems.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b  pb-5'>
                                <div className='absolute top-0 right-2'>
                                    <RiDeleteBinLine onClick={() => bannerSectionRemove(index)} className='cursor-pointer text-red-600' />
                                </div>
                                <div className='flex flex-col gap-2 w-1/2'>

                                    <Controller
                                        name={`bannerSection.items.${index}.style`}
                                        control={control}
                                        rules={{ required: "Style is required" }}
                                        render={({ field }) => (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue=""
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Style" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Image">
                                                        Image
                                                    </SelectItem>
                                                    <SelectItem value="Video">
                                                        Video
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                </div>

                                {watch(`bannerSection.items.${index}.style`) === "Image" && (
                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-col gap-2'>
                                                <Label className='text-[16px] font-light'>Image</Label>
                                                <Controller
                                                    name={`bannerSection.items.${index}.image`}
                                                    control={control}
                                                    rules={{ required: "Image is required" }}
                                                    render={({ field }) => (
                                                        <ImageUploader
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                <p className='text-xs text-gray-500'>{generateDimentions("home", "banner")}</p>
                                                {errors.bannerSection?.items?.[index]?.image && (
                                                    <p className="text-red-500">{errors.bannerSection?.items?.[index]?.image.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Image Alt</Label>
                                            <Input type='text' placeholder='Image Alt' {...register(`bannerSection.items.${index}.imageAlt`, {
                                                required: "Image Alt is required"
                                            })} />
                                            {errors.bannerSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.imageAlt.message}</p>}
                                        </div>

                                    </div>
                                )}

                                {watch(`bannerSection.items.${index}.style`) === "Video" && (
                                    <div className="grid grid-cols-2 gap-2">
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Video</Label>
                                            <Controller
                                                name={`bannerSection.items.${index}.video`}
                                                control={control}
                                                rules={{ required: "Video is required" }}
                                                render={({ field }) => (
                                                    <VideoUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            {errors.bannerSection?.items?.[index]?.video && (
                                                <p className="text-red-500">{errors.bannerSection?.items?.[index]?.video.message}</p>
                                            )}
                                        </div>



                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Poster</Label>
                                            <Controller
                                                name={`bannerSection.items.${index}.poster`}
                                                control={control}
                                                rules={{ required: "Poster is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            <p className='text-xs text-gray-500'>{generateDimentions("home", "videoPoster")}</p>
                                            {errors.bannerSection?.items?.[index]?.poster && (
                                                <p className="text-red-500">{errors.bannerSection?.items?.[index]?.poster.message}</p>
                                            )}
                                        </div>
                                        <div>

                                        </div>

                                    </div>
                                </div>

                                )}

                                {watch(`bannerSection.items.${index}.style`) !== "" && <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Logo</Label>
                                            <Controller
                                                name={`bannerSection.items.${index}.logo`}
                                                control={control}
                                                rules={{ required: "Logo is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            <p className='text-xs text-gray-500'>{generateDimentions("home", "bannerIcon")}</p>
                                            {errors.bannerSection?.items?.[index]?.logo && (
                                                <p className="text-red-500">{errors.bannerSection?.items?.[index]?.logo.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Logo Alt</Label>
                                            <Input type='text' placeholder='Logo Alt' {...register(`bannerSection.items.${index}.logoAlt`, {
                                                required: "Logo Alt is required"
                                            })} />
                                            {errors.bannerSection?.items?.[index]?.logoAlt && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.logoAlt.message}</p>}
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Main Title</Label>
                                            <Input type='text' placeholder='Main Title' {...register(`bannerSection.items.${index}.mainTitle`, {
                                                required: "Main Title is required"
                                            })} />
                                            {errors.bannerSection?.items?.[index]?.mainTitle && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.mainTitle.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Sub Title</Label>
                                            <Input type='text' placeholder='Sub Title' {...register(`bannerSection.items.${index}.subTitle`, {
                                                required: "Sub Title is required"
                                            })} />
                                            {errors.bannerSection?.items?.[index]?.subTitle && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.subTitle.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Card Text</Label>
                                            <Input type='text' placeholder='Card Text' {...register(`bannerSection.items.${index}.cardText`, {
                                                required: "Card Text is required"
                                            })} />
                                            {errors.bannerSection?.items?.[index]?.cardText && <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.cardText.message}</p>}
                                        </div>

                                    </div>

                                </div>}

                            </div>
                        ))}

                        <div className='flex justify-end'>
                            <Button type='button' className="bg-green-400" onClick={() => bannerSectionAppend({ style: "", mainTitle: "", subTitle: "", video: "", poster: "", logo: "", logoAlt: "", imageAlt: "", image: "", cardText: "" })}>Add Item</Button>
                        </div>

                    </div>
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
                            {cards && cards.map((item: { title: string; number: string; logo: string; }, index) => (
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