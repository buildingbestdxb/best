"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { IoIosCloseCircle } from "react-icons/io";

interface CareerFormData {
  title: string;
  slug: string;
  location: string;
  department: string;
  applyLink: string;
  datePosted: string;
  type:string;
  description: string;
  experience:string;
  responsibilities:string[]
}

interface CareerFormProps {
  careerId?: string;
}

const CareerForm = ({ careerId }: CareerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responsibility,setResponsibility] = useState("")
  const [responsibilities,setResponsibilities] = useState<string[]>([])
  const [departments,setDepartments] = useState<{_id:string,name:string}[]>([])
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<CareerFormData>({
    defaultValues: {
      title: "",
      slug: "",
      location: "",
      department: "",
      applyLink: "",
      datePosted: "",
      type: "",
      description: "",
      experience: "",
      responsibilities:[]
    },
  });

  useEffect(() => {
    const fetchCareer = async () => {
      const response = await fetch(`/api/admin/careers/byid?id=${careerId}`);
      const data = await response.json();
      console.log(data)
      setValue("title", data.data.title);
      // setValue("slug", data.data.slug);
      setValue("location", data.data.location);
      setValue("department", data.data.department);
      setValue("applyLink", data.data.applyLink);
      if (data.data.datePosted) {
        const formattedDate = new Date(data.data.datePosted).toISOString().split("T")[0];
        setValue("datePosted", formattedDate);
      }
      setValue("type",data.data.type)
      setValue("experience",data.data.experience)
      setValue("description",data.data.description)
      if(data.data.responsibilities){
        setResponsibilities(data.data.responsibilities)
        setValue("responsibilities",data.data.responsibilities)
      }
    };

    if(careerId){
      fetchCareer();
    }
  }, [careerId]);

  useEffect(()=>{
    fetchDepartments()
  },[])

  const onSubmit = async (data: CareerFormData) => {
    try {
      if(responsibilities.length === 0){
        setError("responsibilities", { type: "required", message: "Responsibilities is required" });
        return
      }
      setIsLoading(true);
      if (careerId) {
        const response = await fetch(`/api/admin/careers/byid?id=${careerId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/careers");
      } else {
        const response = await fetch(`/api/admin/careers`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        const res = await response.json();
        console.log(res);
        router.push("/admin/careers");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () =>{
    try {
      const response = await fetch("/api/admin/careers/department")
      const data = await response.json()
      setDepartments(data.data)
    } catch (error) {
      console.log(error)
    }
  }


  const handleAddResponsibility = () =>{
    if(!responsibility){
      return
    }
    setResponsibilities([...responsibilities,responsibility])
    setResponsibility("")
    setValue("responsibilities",[...responsibilities,responsibility])
  }

  const handleRemoveResponsibility = (index:number) => {
    const updatedResponsibilities = [...responsibilities]
    updatedResponsibilities.splice(index, 1)
    setResponsibilities(updatedResponsibilities)
    setValue("responsibilities",updatedResponsibilities)
  }

  useEffect(()=>{
    console.log("called")
    const slug = getValues("title")
      .toLowerCase()
      .replace(/&/g, "") // remove all '&'
      .replace(/[^\w\s-]/g, "") // remove all special characters except spaces and hyphens
      .replace(/\s+/g, "-") // replace spaces with hyphens
    setValue("slug", slug)

  },[watch("title")])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </Label>
          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="slug" className="block text-sm font-medium text-gray-700">
            Slug
          </Label>
          <Input
            {...register("slug")}
            type="text"
            id="slug"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </Label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Time">Full Time</SelectItem>
                  <SelectItem value="Part Time">Part Time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Location
          </Label>
          <Input
            {...register("location", { required: "Location is required" })}
            type="text"
            id="location"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Department
          </Label>
          <Controller
            name="department"
            control={control}
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((item,index)=>(
                    <SelectItem value={item.name} key={index}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Experience required
          </Label>
          <Input
            {...register("experience", { required: "Experience is required" })}
            type="text"
            id="experience"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Apply Link
          </Label>
          <Input
            {...register("applyLink", { required: "Apply Link is required" })}
            type="text"
            id="applyLink"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.applyLink && <p className="mt-1 text-sm text-red-600">{errors.applyLink.message}</p>}
        </div>

        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Date Posted
          </Label>
          <Input
            {...register("datePosted", { required: "Date Posted is required" })}
            type="date"
            id="datePosted"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
          {errors.datePosted && <p className="mt-1 text-sm text-red-600">{errors.datePosted.message}</p>}
        </div>

           <div>
            <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Responsibilities
            </Label>
        <div className="border border-gray-300 p-4 w-full h-[200px]">
            <div className="relative">
            <Input value={responsibility} placeholder="Type in responsibilities" onChange={(e) => setResponsibility(e.target.value)} type="text" id="responsibility" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"/>
            <Button type="button" className="absolute top-0 right-0" onClick={handleAddResponsibility}>Add</Button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
            {responsibilities.map((item,index)=>(
              <span className="bg-gray-200 p-2 rounded relative" key={index}>
                {item}
                <IoIosCloseCircle onClick={()=>handleRemoveResponsibility(index)} className="absolute -top-2 -right-2 cursor-pointer text-md"/>
                </span>
            ))}
            </div>
        </div>
        </div>
        {errors.responsibilities && <p className="mt-1 text-sm text-red-600">{errors.responsibilities.message}</p>}

        <div>
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Description
                    </Label>
        
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="mt-1" />
                    )}
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                  </div>


      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default CareerForm;
