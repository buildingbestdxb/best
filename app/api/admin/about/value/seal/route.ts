import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();

      const formData = await request.formData();
      const seal = formData.get("seal")

      const about = await About.findOne()
      if(about){
            about.core_value.seals.push({logo:seal})
            await about.save()
            return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 }); 
      }
    } catch (error) {
      console.error("Error editing content:", error);
      return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
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
      const about = await About.findOne()
      if(about){
            const toBeDeletedItem = about.core_value.seals.findIndex((item:{_id:string})=>item._id==id)
            if(toBeDeletedItem!==-1){
                about.core_value.seals.splice(toBeDeletedItem,1)
                await about.save()
                return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 }); 
            }  
      }
    } catch (error) {
      console.error("Error editing content:", error);
      return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
    }
  }