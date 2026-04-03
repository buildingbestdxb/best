import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Home from "@/models/Home";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      await connectDB();
      const about = await Home.find();
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

      const {bannerSection} = await request.json()

      const home = await Home.findOne()
      if(home){
            home.bannerSection = bannerSection
            await home.save()
            return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 }); 
      }
    } catch (error) {
      console.error("Error editing content:", error);
      return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
    }
  }