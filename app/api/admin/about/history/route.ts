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


export async function POST(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const formData = await request.formData()
      const year = formData.get("year")
      const content = formData.get("content")
      const image = formData.get("image")
      const about = await About.findOne();
      if(about){
        about.history.push({year,content,image})
        await about.save()
        return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error updating content:", error);
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
  }


  export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const {searchParams} = new URL(request.url)
      const id = searchParams.get("id")
      const formData = await request.formData()
      const year = formData.get("year")
      const content = formData.get("content")
      const image = formData.get("image")
      const about = await About.findOne();
      if(about){
        const toBeEditedItem = about.history.find((item:{_id:string})=>item._id==id)
        if(toBeEditedItem){
            toBeEditedItem.year = year
            toBeEditedItem.content = content
            toBeEditedItem.about = about
            toBeEditedItem.image = image
            await about.save()
            return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 });
        }else{
            return NextResponse.json({ message: "Content updation failed", success: true }, { status: 400 });

        }
      }
    } catch (error) {
      console.error("Error updating content:", error);
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
  }


  export async function DELETE(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const {searchParams} = new URL(request.url)
      const id = searchParams.get("id")
      const about = await About.findOne();
      if(about){
        const toBeDeletedItem = about.history.findIndex((item:{_id:string})=>item._id==id)
        if(toBeDeletedItem!==-1){
            about.history.splice(toBeDeletedItem,1)
            await about.save()
            return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 });
        }else{
            return NextResponse.json({ message: "Content updation failed", success: true }, { status: 400 });

        }
      }
    } catch (error) {
      console.error("Error updating content:", error);
      return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
  }