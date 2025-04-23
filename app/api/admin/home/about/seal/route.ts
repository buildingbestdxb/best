import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Home from "@/models/Home";
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

      const home = await Home.findOne()
      if(home){
            home.about.seals.push({logo:seal})
            await home.save()
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
      const home = await Home.findOne()
      if(home){
            const toBeDeletedItem = home.about.seals.findIndex((item:{_id:string})=>item._id==id)
            if(toBeDeletedItem!==-1){
                home.about.seals.splice(toBeDeletedItem,1)
                await home.save()
                return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 }); 
            }  
      }
    } catch (error) {
      console.error("Error editing content:", error);
      return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
    }
  }