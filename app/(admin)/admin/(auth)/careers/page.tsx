"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import DeleteCareerDialog from "./components/DeleteCareerDialog";
import { useForm } from "react-hook-form";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialogue-box'
import Link from "next/link";

type Career = {
  _id: string;
  title: string;
  department: string;
  location: string;
  applyLink: string;
};


interface Values {
  bannerImage: string;
  bannerAlt: string;
}

const CareersPage = () => {

  const {
    setValue,
    watch,
    getValues,
    formState: { },
  } = useForm<Values>();

  const [isLoading, setIsLoading] = useState(true);
  const [careers, setCareers] = useState<Career[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [requests,setRequests] = useState<{fullName:string;email:string;phone:string;appliedFor:string}[]>([])
  const [departments,setDepartments] = useState<{_id:string,name:string}[]>([])
  const [departmentName,setDepartmentName] = useState("")
  const router = useRouter();

  const fetchCareers = async () => {
    const response = await fetch("/api/admin/careers");
    const data = await response.json();
    setCareers(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCareers()
    fetchBanner()
    fetchMeta()
    fetchRequests()
    fetchDepartments()
  }, []);

  const handleClickNewCareer = () => {
    router.push("/admin/careers/new");
  };

  const handleEditCareer = (careerId: string) => {
    router.push(`/admin/careers/${careerId}`);
  };

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/admin/careers/banner')
      if (response.ok) {
        const data = await response.json()
        if (data.data) {

          setValue("bannerImage", data.data[0].image)
          setValue("bannerAlt", data.data[0].alt)
        }
      }
    } catch (error) {
      console.log("Failed to fetch data:", error)
    }
  }


  const handleBannerSave = async () => {
    try {
      const formData = new FormData()
      formData.append("bannerImage", getValues("bannerImage"))
      formData.append("bannerAlt", getValues("bannerAlt"))
      formData.append("pageName", "career")
      const response = await fetch(`/api/admin/careers/banner`, {
        method: "PATCH",
        body: formData
      })
      if (response.ok) {
        const data = await response.json()
        alert(data.message)
        fetchBanner()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMetaSave = async () => {
    try {
      const formData = new FormData()
      formData.append("metaTitle", metaTitle)
      formData.append("metaDescription", metaDescription)
      formData.append("pageName", "career")
      const response = await fetch(`/api/admin/careers/meta`, {
        method: "PATCH",
        body: formData
      })
      if (response.ok) {
        const data = await response.json()
        alert(data.message)
        fetchMeta()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMeta = async () => {
    try {
      const response = await fetch('/api/admin/careers/meta')
      if (response.ok) {
        const data = await response.json()
        if (data.data) {
          setMetaTitle(data.data.metaTitle)
          setMetaDescription(data.data.metaDescription)
        }
      }
    } catch (error) {
      console.log("Failed to fetch data:", error)
    }
  }

  const fetchRequests = async() =>{
    try {
        const response = await fetch('/api/admin/careers/request')
        if(response.ok){
            const data = await response.json()
            if(data.data){
                setRequests(() => [...data.data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,3));
            }
        }
    } catch (error) {
        console.log("Failed to fetch data:",error)
    }
}

const handleAddNewDepartment = async () =>{
    try {
        const response = await fetch('/api/admin/careers/department', {
            method: "POST",
            body: JSON.stringify({ name: departmentName })
        })
        if (response.ok) {
            const data = await response.json()
            alert(data.message)
            fetchDepartments()
        }
    } catch (error) {
        console.log("Failed to fetch data:",error)
    }
}

const fetchDepartments = async () => {
    try {
        const response = await fetch('/api/admin/careers/department')
        if (response.ok) {
            const data = await response.json()
            if (data.data) {
                setDepartments(data.data)
            }
        }
    } catch (error) {
        console.log("Failed to fetch data:", error)
    }
}

const handleEditDepartment = async (id:string) =>{
    try {
        const response = await fetch(`/api/admin/careers/department?id=${id}`, {
            method: "PATCH",
            body: JSON.stringify({ name: departmentName })
        })
        if (response.ok) {
            const data = await response.json()
            alert(data.message)
            fetchDepartments()
        }
    } catch (error) {
        console.log("Failed to fetch data:",error)
    }
}

const handleDeleteDepartment = async (id:string) =>{
    try {
        const response = await fetch(`/api/admin/careers/department?id=${id}`, {
            method: "DELETE"
        })
        if (response.ok) {
            const data = await response.json()
            alert(data.message)
            fetchDepartments()
        }
    } catch (error) {
        console.log("Failed to fetch data:",error)
    }
}

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading careers...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
    <div className="p-6 flex flex-col gap-5">
      <div className='border-dashed border-2 p-4 flex flex-col gap-5'>
                                <div className='flex justify-between'>
                                    <div>Meta Section</div>
                                    <Button onClick={handleMetaSave}>Save</Button>
                                </div>
                                <div>
                                    <Label>Meta Title</Label>
                                    <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                                </div>
                                <div>
                                    <Label>Meta Description</Label>
                                    <Input value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                                </div>
                            </div>
      <div>
        <div className='flex justify-between mb-5'>
          <h2 className='font-bold text-3xl'>Banner Image</h2>
          <Button onClick={handleBannerSave}>Save Banner</Button>
        </div>
        <ImageUploader value={watch('bannerImage')} onChange={(url) => setValue("bannerImage", url)} />
        <Label>Banner Alt</Label>
        <Input value={watch('bannerAlt')} onChange={(e) => setValue("bannerAlt", e.target.value)} />
      </div>


      <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                <h1 className='font-bold text-3xl'>Departments</h1>
                <Dialog>
                            <DialogTrigger onClick={()=>setDepartmentName("")}>Add New</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Department</DialogTitle>
                                    <DialogDescription className='gap-2 grid grid-cols-1'>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Name</Label>
                                            <Input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose onClick={handleAddNewDepartment}>Save</DialogClose>
                            </DialogContent>
                        </Dialog>
                </div>
                <div className='border h-[200px] p-2 flex flex-col gap-2 overflow-y-auto'>
                    {departments && departments.map((item:{_id:string,name:string},index)=>(
                        <div className='w-full bg-orange-300 p-4 rounded-lg flex justify-between items-center' key={index}>
                        <div>
                            {item.name}
                        </div>
                        <div className='flex gap-5'>
                        <Dialog>
                            <DialogTrigger onClick={()=>setDepartmentName(item.name)}>Edit</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Department</DialogTitle>
                                    <DialogDescription className='gap-2 grid grid-cols-1'>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Name</Label>
                                            <Input value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose onClick={()=>handleEditDepartment(item._id)}>Save</DialogClose>
                            </DialogContent>
                        </Dialog>
                        <Button className='bg-transparent hover:bg-transparent text-sm border-none shadow-none font-light' onClick={()=>handleDeleteDepartment(item._id)}>Delete</Button>
                        </div>
                    </div>
                    ))}
                
                </div>
            </div>


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Careers</h1>
        <Button className="bg-primary text-white" onClick={handleClickNewCareer}>
          <span className="mr-2">+</span>
          Add Career
        </Button>
      </div>
      {careers?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No careers found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first career</p>
          <Button className="bg-primary text-white" onClick={handleClickNewCareer}>
            <span className="mr-2">+</span>
            Add Career
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers?.map((career) => (
            <Card key={career._id}>
              <CardHeader>{career.title}</CardHeader>
              <CardContent>
                <p>{career.department}</p>
                <p>{career.location}</p>
                <p>{career.applyLink}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={() => handleEditCareer(career._id)}>
                  Edit
                </Button>
                <DeleteCareerDialog careerId={career._id} onDelete={fetchCareers} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>

    <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                <div className='font-bold'>Applications</div>
                <Link href={'/admin/careers/allrequest'}>View All</Link>
                </div>
                <div className='border h-[200px] p-2 flex flex-col gap-2'>
                    {requests && requests.map((item:{fullName:string,email:string,phone:string,appliedFor:string},index)=>(
                        <div className='w-full bg-orange-300 p-4 rounded-lg flex justify-between items-center' key={index}>
                        <div>
                            {item.fullName}
                        </div>
                        <div className='flex gap-5'>
                        <Dialog>
                            <DialogTrigger>View</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Details</DialogTitle>
                                    <DialogDescription className='gap-2 grid grid-cols-2'>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Name</Label>
                                            <Input value={item.fullName} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Email</Label>
                                            <Input value={item.email} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Phone</Label>
                                            <Input value={item.phone} readOnly/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <Label>Applied For</Label>
                                            <Input value={item.appliedFor} readOnly/>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogClose>Close</DialogClose>
                            </DialogContent>
                        </Dialog>
                        {/* <Button className='bg-transparent hover:bg-transparent text-sm border-none shadow-none font-light'>Delete</Button> */}
                        </div>
                    </div>
                    ))}
                
                </div>
            </div>

    </div>
  );
};

export default CareersPage;
