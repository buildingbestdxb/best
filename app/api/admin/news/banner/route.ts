import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Banner from "@/models/BannerImage";
import { NextRequest, NextResponse } from "next/server";

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
      const newsBanner = await Banner.create({image:bannerImage,alt:bannerAlt,pageName});
      if(newsBanner){
        return NextResponse.json({ message: "Banner updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
    }
  }


  export async function GET(){
    try {
      await connectDB();
      const banner = await Banner.findOne({pageName:"news"})
      if(banner){
        return NextResponse.json({ data: banner }, { status: 200 });
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
      return NextResponse.json({ error: "Failed to fetch banner" }, { status: 500 });
    }
  }