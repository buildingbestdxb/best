import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      await connectDB();
      const about = await About.find();
      return NextResponse.json({ data: about, success: true }, { status: 200 });
    } catch (error) {
      console.error("Error fetching content:", error);
      return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
  }


  export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const formData = await request.formData();
      const content = formData.get("content")
      const image = formData.get("image")
      const altTag = formData.get("altTag")
      const about = await About.findOne()
      if(about){
            about.strength_and_vision.content = content
            about.strength_and_vision.image = image
            about.strength_and_vision.altTag = altTag
            await about.save()
            return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 }); 
      }
    } catch (error) {
      console.error("Error editing content:", error);
      return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
    }
  }