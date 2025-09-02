"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteProjectDialog from "./components/DeleteProjectDialog";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageUploader } from "@/components/ui/image-uploader";
import {closestCorners, DndContext, DragEndEvent} from '@dnd-kit/core'
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable'
import ProjectCard from "./ProjectCard";
import { BiHide } from "react-icons/bi";
import { GoEye } from "react-icons/go";


type Project = {
  _id: string;
  name: string;
  description: string;
  images: string[];
  specifications: {
    name: string;
    value: string;
  }[];
  hidden: boolean;
};

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const [reorderMode, setReorderMode] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);

  const fetchProjects = async () => {
    const response = await fetch("/api/admin/projects");
    const data = await response.json();
    setProjects(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
    fetchMeta()
    fetchBanner()
  }, []);

  const handleClickNewProject = () => {
    router.push("/admin/projects/new");
  };

  const handleEditProject = (projectId: string) => {
    router.push(`/admin/projects/${projectId}`);
  };

  const handleHideProject = async(projectId: string) => {
    try {
      const response = await fetch(`/api/admin/projects/byid?id=${projectId}`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json()
        alert(data.message)
        fetchProjects()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleMetaSave = async() =>{
    try {
      const formData = new FormData()
      formData.append("metaTitle", metaTitle)
      formData.append("metaDescription", metaDescription)
      const response = await fetch(`/api/admin/projects/meta`, {
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
      const response = await fetch('/api/admin/projects/meta')
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

  const handleBannerSave = async() => {
    try {
      const formData = new FormData()
      formData.append("bannerImage", bannerImage)
      formData.append("bannerAlt", bannerAlt)
      formData.append("pageName", "projects")
      const response = await fetch(`/api/admin/projects/banner`, {
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

  const fetchBanner = async () => {
    try {
      const response = await fetch('/api/admin/projects/banner')
      if (response.ok) {
        const data = await response.json()
        if (data.data) {
          console.log(data.data)
          setBannerImage(data.data.image)
          setBannerAlt(data.data.alt)
        }
      }
    } catch (error) {
      console.log("Failed to fetch data:", error)
    }
  }


  const getTaskPos = (id: number | string) => projects.findIndex((item:{_id:string})=>( item._id == id))
  const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
    
      if (!over || active.id === over.id) return;
    
      setProjects((projects:Project[]) => {
        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);
        return arrayMove(projects, originalPos, newPos);
      });
    };


    const confirmPosition = async() => {
      setReorderMode(!reorderMode);
      setIsReorderMode(true);

      const updatedProjects = projects.map((project, index) => ({
          ...project,
          index: index + 1,
      }));

      setProjects(updatedProjects); 

      const formData = new FormData()
      formData.append('projects',JSON.stringify(updatedProjects))
      const response = await fetch(`/api/admin/projects/reorder`,{
          method:"POST",
          body:formData
      })
      if(response.ok){
          const data = await response.json()
          if(data.success){
              alert(data.message)
          }
      }
      setIsReorderMode(false);
  };


  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }
  return (
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

                            <div className="border-dashed border-2 p-4 flex flex-col gap-5">
                                    <div className='flex justify-between mb-5'>
                                      <h2 className='font-bold text-3xl'>Banner Image</h2>
                                      <Button onClick={handleBannerSave}>Save Banner</Button>
                                    </div>
                                    <ImageUploader value={bannerImage} onChange={(url) => setBannerImage(url)} />
                                    <Label>Banner Alt</Label>
                                    <Input value={bannerAlt} onChange={(e) => setBannerAlt(e.target.value)} />
                                  </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex gap-5">
        <Button disabled={isReorderMode} className="bg-primary text-white" onClick={handleClickNewProject}>
          <span className="mr-2">+</span>
          Add Project
        </Button>
        <Button disabled={isReorderMode} className={`text-white ${reorderMode ? "bg-yellow-700" : "bg-green-700"}`} onClick={() => reorderMode ? confirmPosition() : setReorderMode(!reorderMode)}>{reorderMode ? "Done" : "Reorder"}</Button>
        </div>
      </div>

      
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first project</p>
          <Button disabled={isReorderMode} className="bg-primary text-white" onClick={handleClickNewProject}>
            <span className="mr-2">+</span>
            Add Project
          </Button>
          
        </div>
      ) : 
        
        !reorderMode ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="group">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-md font-semibold">{project.name}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10"
                      onClick={() => handleEditProject(project._id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={project.hidden ? "h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10 bg-red-100" : "h-8 w-8 text-gray-500 hover:text-primary hover:bg-primary/10"}
                      onClick={() => handleHideProject(project._id)}
                    >
                      {project.hidden ? <GoEye className="h-4 w-4"/> : <BiHide className="h-4 w-4"/>}
                    </Button>
                    <DeleteProjectDialog projectId={project._id} onDelete={fetchProjects} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>) : (
          <div className="grid grid-cols-1 gap-6">
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={projects.map((project)=>project._id)} strategy={verticalListSortingStrategy}>
                {projects?.map((project, index) => (
                    <ProjectCard key={index} project={project} id={project._id} />
                ))}
            </SortableContext>
        </DndContext>
        </div>
      )}
    </div>
  );
}
