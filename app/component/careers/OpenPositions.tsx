"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ButtonWithIcon from "../common/Buttons/ButtonWithIcon";

export default function OpenPositions() {
  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("Department");
  const departments = ["HR", "Engineering", "Marketing", "Sales"];
  const jobListings = [
    {
      title: "Associate, GTM Finance & Operations",
      department: "Revenue Operations",
      employmentType: "Full Time",
      location: "Sharjah",
    },
    {
      title: "Senior Software Engineer",
      department: "Revenue Operations",
      employmentType: "Full Time",
      location: "Dubai",
    },
    {
      title: "Associate, GTM Finance & Operations",
      department: "Revenue Operations",
      employmentType: "Full Time",
      location: "Sharjah",
    },
    {
      title: "Marketing Specialist",
      department: "Revenue Operations",
      employmentType: "Full Time",
      location: "Dubai",
    },
  ];
  const handleSelect = (dept: string) => {
    setSelectedDept(dept); // Update selected department
    setOpen(false); // Close dropdown
  };

  return (
    <div>
      <section className="my-[100px]">
        <div className="container">
          <div className="flex justify-between items-center border-b-[1px] border-[#1E1E1E] pb-[12px] mb-[60px]">
            <div className="md:col-span-8">
              <h3 className="text-black lg:text-[32px] text-[27px] font-[700] uppercase">
                Open positions
              </h3>
            </div>
            <div className="md:col-span-4 relative">
              <div className="">
                <button
                  className="w-full flex justify-between items-center gap-2 px-4 py-2 uppercase "
                  onClick={() => setOpen(!open)}>
                  <span>{selectedDept}</span>
                  <ChevronDown className="h-5 w-5 text-gray-500 " />
                </button>

                {open && (
                  <ul className="absolute w-[230px] mt-2 bg-white border rounded-lg shadow-lg z-10 ">
                    {departments.map((dept) => (
                      <li
                        key={dept}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer uppercase"
                        onClick={() => handleSelect(dept)}>
                        {dept}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {jobListings.map((job, index) => (
            <div key={index} className="w-full">
              <div className="grid lg:grid-cols-2 gap-x-6 items-center  w-full">
                <div className="flex items-center w-full">
                  <div className="designation w-full">
                    <h3 className="text-[22px] font-semibold w-full">
                      {job.title}
                    </h3>
                  </div>
                  <div className="departments w-full text-right">
                    <p className="text-[16px] w-full uppercase">
                      {job.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-right lg:mt-0 mt-7 w-full">
                  <div className="locations w-full flex lg:justify-end space-x-3">
                    <span className="text-[18px] text-black/60 font-[400] px-[16px] py-[4px] bg-black/5 rounded-custom">
                      {job.employmentType}
                    </span>
                    <span className="text-[18px] text-black/60 font-[400] px-[16px] py-[4px] bg-black/5 rounded-custom">
                      {job.location}
                    </span>
                  </div>
                  <div className="applybtm w-full flex justify-end">
                    <ButtonWithIcon link="" buttonText="Apply Now" />
                  </div>
                </div>
              </div>

              {/* HR Line After Each Job */}

              <hr className="my-[32px] w-full border-t border-dashed border-gray-400" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
