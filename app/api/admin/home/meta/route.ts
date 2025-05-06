import connectDB from "@/lib/mongodb";
import Home from "@/models/Home";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function POST(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    try {
      await connectDB();

      const {metaTitle, metaDescription} = await request.json();
       const home = await Home.findOne({})
       if(!home) {
        return NextResponse.json({ error: "Home not found" }, { status: 404 });
       }
       home.metaTitle = metaTitle
       home.metaDescription = metaDescription
       await home.save()
       return NextResponse.json({ message: "Meta data saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving meta data:", error)
        return NextResponse.json({ error: "Failed to save meta data" }, { status: 500 });
    }
}