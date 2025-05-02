"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link'

const AdminRequest = () => {

    const [requests,setRequests] = useState<{_id:string,fullName:string;email:string;subject:string;message:string}[]>([])
    
    const fetchRequests = async() =>{
        try {
            const response = await fetch('/api/admin/careers/request')
            if(response.ok){
                const data = await response.json()
                if(data.data){
                    setRequests(() => [...data.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
                }
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }

    useEffect(()=>{
        fetchRequests()
    },[])

    const handleDeleteRequest = async(id:string) =>{
        try {
            const response = await fetch(`/api/admin/careers/request?id=${id}`,{
                method:"DELETE"
            })
            if(response.ok){
                const data = await response.json()
                alert(data.message)
                fetchRequests()
            }
        } catch (error) {
            console.log("Failed to delete data:",error)
        }
    }

  return (
    <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                <div className=' text-3xl font-bold'>All Requests</div>
                </div>
                <div className='flex flex-col gap-2'>
                    {requests && requests.map((item)=>(
                        <div className='w-full bg-orange-300 p-4 rounded-lg flex justify-between items-center' key={item._id}>
                        <div>
                            {item.fullName}
                        </div>
                        <div className='flex gap-5 items-center'>
                            <Link href={`/admin/careers/allrequest/${item._id}`}>View</Link>
                        <Button className='bg-transparent hover:bg-transparent text-sm border-none shadow-none font-light' onClick={()=>handleDeleteRequest(item._id)}>Delete</Button>
                        </div>
                    </div>
                    ))}
                
                </div>
            </div>
  )
}

export default AdminRequest