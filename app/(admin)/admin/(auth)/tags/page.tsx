"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface FormValues {
    headerScript: string;
    bodyScript: string;
}

const CodePage = () => {
    const { register, handleSubmit,setValue } = useForm<FormValues>();
    
    const onSubmit = async(data: FormValues) => {
        try {
            const response = await fetch("/api/admin/tags", {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error saving details", error);
        }
    }

    const fetchTag = async() => {
        try {
            const response = await fetch("/api/admin/tags");
            if (response.ok) {
                const data = await response.json();
                setValue('headerScript', data.tag.headerScript);
                setValue('bodyScript', data.tag.bodyScript);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error fetching details", error);
        }
    }

    useEffect(() => {
        fetchTag();
    }, []);
    
    return (
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <Label className='font-bold'>Header Script</Label>
                <Textarea {...register('headerScript')}></Textarea>
            </div>

            <div className="space-y-4">
                <Label className='font-bold'>Body Script</Label>
                <Textarea {...register('bodyScript')}></Textarea>
            </div>
            <div className="flex justify-center">
                <Button type="submit" className='w-fit cursor-pointer'>Submit</Button>
            </div>
        </form>
    )
}

export default CodePage