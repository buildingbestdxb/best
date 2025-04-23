"use client"

import React, { useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialogue-box'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';

const AdminEnquiry = () => {

    const [enquiries,setEnquiries] = useState<{_id:string,name:string;email:string;subject:string;message:string}[]>([])
    
    const fetchEnquiry = async() =>{
        try {
            const response = await fetch('/api/admin/contact/enquiry')
            if(response.ok){
                const data = await response.json()
                if(data.data){
                    setEnquiries(() => [...data.data].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                }
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }

    useEffect(()=>{
        fetchEnquiry()
    },[])

    const handleDeleteEnquiry = async(id:string) =>{
        try {
            const response = await fetch(`/api/admin/contact/enquiry?id=${id}`,{
                method:"DELETE"
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchEnquiry()
            }
        } catch (error) {
            console.log("Failed to delete data:",error)
        }
    }

  return (
    <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                <div className=' text-3xl font-bold'>Enquiries</div>
                </div>
                <div className='flex flex-col gap-2'>
                    {enquiries && enquiries.map((item)=>(
                        <div className='w-full bg-orange-300 p-4 rounded-lg flex justify-between items-center' key={item._id}>
                        <div>
                            {item.name}
                        </div>
                        <div className='flex gap-5'>
                        <Dialog>
                            <DialogTrigger>View</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Details</DialogTitle>
                                    <DialogDescription className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Name</Label>
                                            <Input value={item.name} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Email</Label>
                                            <Input value={item.email} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Subject</Label>
                                            <Input value={item.subject} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Message</Label>
                                            <textarea value={item.message} readOnly></textarea>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose>Close</DialogClose>
                            </DialogContent>
                        </Dialog>
                        <Button className='bg-transparent hover:bg-transparent text-sm border-none shadow-none font-light' onClick={()=>handleDeleteEnquiry(item._id)}>Delete</Button>
                        </div>
                    </div>
                    ))}
                
                </div>
            </div>
  )
}

export default AdminEnquiry