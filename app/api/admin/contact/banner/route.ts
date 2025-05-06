import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Banner from "@/models/BannerImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const bannerImage = await Banner.find({pageName:"contact"});
    return NextResponse.json({ data:bannerImage , success: true }, { status: 200 });
}


export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const formData = await request.formData()
      const bannerImage = formData.get("bannerImage")
      const bannerAlt = formData.get("bannerAlt")
      const pageName = formData.get("pageName")
      const contactBanner = await Banner.findOneAndUpdate({pageName},{$set:{image:bannerImage,alt:bannerAlt}});
      if(contactBanner){
        return NextResponse.json({ message: "Banner updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
    }
  }
