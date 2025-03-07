"use client"

import React, { useEffect, useState } from "react";

import ProjectList from "../projectsLists/ProjectList";
import HeroSection from "../common/Banner/Hero";
import Sectors from "../projectsLists/Sectors";
import useSWR from "swr";

interface DataType {
    projects: {
        description: string;
        thumbnail:string;
        images: string[];
        location: string;
        name: string;
        specifications: {
            name: string;
            value: string;
            _id: string;
        }[];
        type: string;
        _id: string;
    }[]
}

export default function Projects() {

    const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
    const { data: projectData }: { data: DataType } = useSWR(`/api/admin/projects/all`, fetcher)
    const [actualData, setActualData] = useState<{ thumbnail:string;description: string; images: string[]; location: string; name: string; specifications: { name: string; value: string; _id: string; }[]; type: string; _id: string; }[]>([])


    useEffect(() => {
        console.log(projectData)
        setActualData(() => (
            projectData && projectData.projects.map((item) => item)
        ))
    }, [projectData])



    return (
        <>
            <HeroSection
                imageSrc="/assets/img/projects/banner.jpg"
                title={`All Projects`}
                breadcrumb="Projects /"
            />

            {projectData && <ProjectList data={actualData}/>}
            <Sectors />
        </>
    );
}
