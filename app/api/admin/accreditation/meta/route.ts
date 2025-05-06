import connectDB from "@/lib/mongodb";
import AccreditationMeta from "@/models/AccreditationMeta";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest){
    try {
        await connectDB();
        const {metaTitle, metaDescription} = await req.json();
        const accreditation = await AccreditationMeta.findOne({});
        if(!accreditation){
            return NextResponse.json({ error: "Accreditation not found" }, { status: 404 });
        }
        accreditation.metaTitle = metaTitle;
        accreditation.metaDescription = metaDescription;
        await accreditation.save();
        return NextResponse.json({ data: accreditation,message:"Accreditation meta updated successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating accreditation meta:", error);
        return NextResponse.json({ error: "Failed to update accreditation meta" }, { status: 500 });
    }
}


export async function GET(){
    try {
      await connectDB();
      const accreditation = await AccreditationMeta.findOne();
      if (accreditation) {
        return NextResponse.json({ data: accreditation, success: true }, { status: 200 });
      }
    } catch (error) {
      console.error("Error fetching meta:", error);
      return NextResponse.json({ error: "Failed to fetch meta" }, { status: 500 });
    }
  }