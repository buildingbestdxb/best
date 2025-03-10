"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Input } from '@/components/ui/input'



interface Values {
    title: string;
    description: string;
}

const SectorsSection = () => {

    const {
        register,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<Values>();





    const fetchData = async () => {
        try {
            const response = await fetch(`/api/admin/home/sector`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setValue("title", data.data[0].sectorHeading)
                setValue("description", data.data[0].sectorDescription)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])



    const onSubmitForm = async (e: FormEvent) => {
        console.log("here triggered")
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append("title", getValues("title"))
            formData.append("description", getValues("description"))

            const response = await fetch(`/api/admin/home/sector`, {
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



    return (
        <div className='flex flex-col gap-5'>
            <form className='border-dashed border-2 p-4 flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Sectors Content
                    </Label>
                    <Button type='submit' onClick={(e) => onSubmitForm(e)}>Save</Button>
                </div>
                <div className='grid grid-cols-2 gap-5'>
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
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                            )}
                        />
                    </div>

                </div>
            </form>

        </div>
    )
}

export default SectorsSection