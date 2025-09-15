"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RiDeleteBinLine } from "react-icons/ri";
import { ImageUploader } from '@/components/ui/image-uploader';
import { generateDimentions } from '@/lib/generateDimentions';
import { Textarea } from '@/components/ui/textarea';




interface LeadershipFormData {
    metaTitle: string;
    metaDescription: string;
    bannerImage: string;
    bannerImageAlt: string;
    pageTitle: string;
    messageSection:{
        items:{
            title:string;
            image:string;
            imageAlt:string;
            name:string;
            designation:string;
            message?:string;
        }[]
    }
}

const AdminHome = () => {

    const {
        handleSubmit,
        control,
        register,
        setValue,
        formState: { errors },
    } = useForm<LeadershipFormData>();



    const onSubmit = async (data: LeadershipFormData) => {
        try {

            const response = await fetch(`/api/admin/leadership`, {
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
                const response = await fetch('/api/admin/leadership')
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setValue("metaTitle", data.data.metaTitle)
                    setValue("metaDescription", data.data.metaDescription)
                    setValue("pageTitle", data.data.pageTitle)
                    setValue("bannerImage", data.data.bannerImage)
                    setValue("bannerImageAlt", data.data.bannerImageAlt)
                    setValue("messageSection.items", data.data.messageSection.items)
                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])



    const { fields: messageSectionItems, append: messageSectionAppend, remove: messageSectionRemove } = useFieldArray({
        control,
        name: "messageSection.items"
    });


    return (
        <div className='flex flex-col gap-5'>
            <div className='text-3xl font-bold'>Leadership Page</div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                <div className='flex flex-col gap-5'>
                    <div>
                        <Label className='text-[16px] font-light'>Meta Title</Label>
                        <Input {...register("metaTitle")} />
                    </div>
                    <div>
                        <Label className='text-[16px] font-light'>Meta Description</Label>
                        <Input {...register("metaDescription")} />
                    </div>
                </div>

                <div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Label className='text-[16px] font-light'>Banner Image</Label>
                            <Controller
                                name={`bannerImage`}
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
                            {errors.bannerImage && (
                                <p className="text-red-500">{errors.bannerImage.message}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 mt-2'>
                        <Label className='text-[16px] font-light'>Banner Image Alt</Label>
                        <Input type='text' placeholder='Image Alt' {...register(`bannerImageAlt`, {
                            required: "Image Alt is required"
                        })} />
                        {errors.bannerImageAlt && <p className='text-red-500'>{errors.bannerImageAlt.message}</p>}
                    </div>

                    <div className='flex flex-col gap-2 mt-2'>
                        <Label className='text-[16px] font-light'>Page Title</Label>
                        <Input type='text' placeholder='Page Title' {...register(`pageTitle`, {
                            required: "Page Title is required"
                        })} />
                        {errors.pageTitle && <p className='text-red-500'>{errors.pageTitle.message}</p>}
                    </div>

                </div>

                <Label className='text-[16px] font-light'>Messages Section</Label>
                <div className='border-dashed border-2 p-2 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex justify-between'>
                    </div>
                    <div className='p-2 rounded-md flex flex-col gap-5'>


                        {messageSectionItems.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-1 gap-2 relative border-b  pb-5'>
                                <div className='absolute top-0 right-2'>
                                    <RiDeleteBinLine onClick={() => messageSectionRemove(index)} className='cursor-pointer text-red-600' />
                                </div>

                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Image</Label>
                                            <Controller
                                                name={`messageSection.items.${index}.image`}
                                                control={control}
                                                rules={{ required: "Image is required" }}
                                                render={({ field }) => (
                                                    <ImageUploader
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            <p className='text-xs text-gray-500'>{generateDimentions("home", "bannerIcon")}</p>
                                            {errors.messageSection?.items?.[index]?.image && (
                                                <p className="text-red-500">{errors.messageSection?.items?.[index]?.image.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Image Alt</Label>
                                            <Input type='text' placeholder='Image Alt' {...register(`messageSection.items.${index}.imageAlt`, {
                                                required: "Image Alt is required"
                                            })} />
                                            {errors.messageSection?.items?.[index]?.imageAlt && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.imageAlt.message}</p>}
                                        </div>

                                    </div>

                                    <div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Title</Label>
                                            <Input type='text' placeholder='Title' {...register(`messageSection.items.${index}.title`, {
                                                required: "Title is required"
                                            })} />
                                            {errors.messageSection?.items?.[index]?.title && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.title.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Name</Label>
                                            <Input type='text' placeholder='Name' {...register(`messageSection.items.${index}.name`, {
                                                required: "Name is required"
                                            })} />
                                            {errors.messageSection?.items?.[index]?.name && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.name.message}</p>}
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Designation</Label>
                                            <Input type='text' placeholder='Designation' {...register(`messageSection.items.${index}.designation`, {
                                                required: "Designation is required"
                                            })} />
                                            {errors.messageSection?.items?.[index]?.designation && <p className='text-red-500'>{errors.messageSection?.items?.[index]?.designation.message}</p>}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='text-[16px] font-light'>Message</Label>
                                            <Textarea placeholder='Message' {...register(`messageSection.items.${index}.message`)} />
                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))}

                        <div className='flex justify-end'>
                            <Button type='button' className="bg-green-400" onClick={() => messageSectionAppend({ title: "", name: "", designation: "", message: "",image:"",imageAlt:"" })}>Add Item</Button>
                        </div>

                    </div>
                    
                </div>
                <div className='flex w-full'>
                        <Button type='submit' className="bg-primary w-full">Submit</Button>
                    </div>
            </form>
        </div>
    )
}

export default AdminHome