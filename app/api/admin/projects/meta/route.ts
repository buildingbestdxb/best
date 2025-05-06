import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import ProjectMeta from "@/models/ProjectMeta";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const isAdmin = await verifyAdmin(req);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    try {
      await connectDB();

      const formData = await req.formData()
      const metaTitle = formData.get("metaTitle")
      const metaDescription = formData.get("metaDescription")
      const projectsMeta = await ProjectMeta.findOne({})
      if(projectsMeta){
        projectsMeta.metaTitle = metaTitle;
        projectsMeta.metaDescription = metaDescription;
        await projectsMeta.save();
        return NextResponse.json({ message: "Meta updated successfully", success: true }, { status: 201 });
      }
    return NextResponse.json({ message: "Meta updated successfully", success: true }, { status: 201 });
    } catch (error) {
      console.error("Error updating meta:", error);
      return NextResponse.json({ error: "Failed to update meta" }, { status: 500 });
    }
  }


  export async function GET(){
    try {
      await connectDB();

      const projectsMeta = await ProjectMeta.findOne()
      if (!projectsMeta) {
        return NextResponse.json({ message: "Meta not found", success: false }, { status: 404 });
      }
      return NextResponse.json({ message: "Meta fetched successfully", success: true, data: projectsMeta }, { status: 200 });
    } catch (error) {
      console.error("Error fetching meta:", error);
      return NextResponse.json({ error: "Failed to fetch meta" }, { status: 500 });
    }
  }
