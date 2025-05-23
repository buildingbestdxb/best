"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface CareerFormDetailsProps {
    _id:string,
    fullName:string;
    email:string;
    phone:string;
    nationality:string;
    cityandcountry:string;
    gender:string;
    dob:string;
    experience:string;
    experienceinconstruction:string;
    experienceinuae:string;
    currentposition:string;
    currentemployer:string;
    currentsalary:string;
    expectedsalary:string;
    noticeperiod:string;
    hasrelative:string;
    relativeName:string;
    haspreviouswork:string;
    hasresponsibilities:string;
    softwares:string;
    companyType:string;
    skills:string;
    resume:string;
    coverLetter:string;
    linkedinProfile:string;
    appliedFor:string;
    createdAt:string;
    updatedAt:string;
    __v:number;
}

const CareerFormDetails= () => {

    const {id} = useParams()
    const [request,setRequest] = useState<CareerFormDetailsProps | null>(null)
    const fetchRequest = async() =>{
        try {
            const response = await fetch(`/api/admin/careers/request?id=${id}`)
            if(response.ok){
                const data = await response.json()
                if(data.data){
                    console.log(data.data)
                    setRequest(data.data)
                }
            }
        } catch (error) {
            console.log("Failed to fetch data:",error)
        }
    }
    
    useEffect(()=>{
        fetchRequest()
    },[])
    
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Career Form Submission [{request?.appliedFor}]</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <Detail label="Full Name" value={request?.fullName} />
        <Detail label="Email" value={request?.email} />
        <Detail label="Phone" value={request?.phone?.toString()} />
        <Detail label="Nationality" value={request?.nationality} />
        <Detail label="City & Country" value={request?.cityandcountry} />
        <Detail label="Gender" value={request?.gender} />
        <Detail label="Date of Birth" value={new Date(request?.dob || "").toLocaleDateString()} />
        <Detail label="Experience (Years)" value={request?.experience?.toString()} />
        <Detail label="Construction Experience (Years)" value={request?.experienceinconstruction?.toString()} />
        <Detail label="Experience in UAE" value={request?.experienceinuae} />
        <Detail label="Current Position" value={request?.currentposition} />
        <Detail label="Current Employer" value={request?.currentemployer} />
        <Detail label="Current Salary" value={request?.currentsalary} />
        <Detail label="Expected Salary" value={request?.expectedsalary} />
        <Detail label="Notice Period" value={request?.noticeperiod} />
        <Detail label="Relative at Company" value={request?.hasrelative} />
        {request?.hasrelative === "yes" && <Detail label="Relative Name & Relationship" value={request?.relativeName} />}
        <Detail label="Worked in similar position?" value={request?.haspreviouswork} />
        <Detail label="Other Responsibilities?" value={request?.hasresponsibilities} />
        <Detail label="Software Skills" value={request?.softwares} />
        <Detail label="Company Type" value={request?.companyType} />
        <Detail label="Skills" value={request?.skills} />
        <Detail label="Resume" value={request?.resume} />
        {request?.coverLetter && <Detail label="Cover Letter" value={request?.coverLetter} />}
        {request?.linkedinProfile && request?.linkedinProfile !== '' && (
          <Detail label="LinkedIn" value={<a href={request?.linkedinProfile} className="text-blue-500 underline" target="_blank">View Profile</a>} />
        )}
      </div>
    </div>
  );
};

const Detail: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col">
    {label == "Resume" || label == "Cover Letter" ? (<div className="flex flex-col">
        <span className="text-sm font-semibold">{label}</span>
    <a href={value?.toString() || ""} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View {label}</a>
    </div>) : ( 
        <div className="flex flex-col">   
        <span className="text-sm font-semibold">{label}</span>
    <span>{value}</span>
    </div>
    )}

  </div>
);

export default CareerFormDetails;
