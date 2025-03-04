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
      const { who_we_are } = await request.json();
      const about = await About.findOne();
      if(about){
        about.who_we_are = who_we_are
        await about.save()
        return NextResponse.json({ data:about,message:"Content updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error creating about:", error);
      return NextResponse.json({ error: "Failed to create about" }, { status: 500 });
    }
  }