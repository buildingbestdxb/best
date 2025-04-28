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

      const {metaTitle, metaDescription} = await request.json();
       const about = await About.findOne({})
       if(!about) {
        return NextResponse.json({ error: "About not found" }, { status: 404 });
       }
       about.metaTitle = metaTitle
       about.metaDescription = metaDescription
       await about.save()
       return NextResponse.json({ message: "Meta data saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving meta data:", error)
        return NextResponse.json({ error: "Failed to save meta data" }, { status: 500 });
    }
}
