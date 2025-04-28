import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Banner from "@/models/BannerImage";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(request)
        if(!isAdmin){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connectDB()
        const formData = await request.formData();
        const bannerImage = formData.get("bannerImage");
        const bannerAlt = formData.get("bannerAlt");
        const projectBanner = await Banner.findOne({pageName:"projects"})
        if(projectBanner){
            projectBanner.image = bannerImage
            projectBanner.alt = bannerAlt
            await projectBanner.save()
        }
        return NextResponse.json({ message: "Banner updated successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error updating banner:", error);
        return NextResponse.json({ error: "Failed to update banner" }, { status: 500 });
    }
  }
  
  export async function GET() {
    try {
        await connectDB()
      const banners = await Banner.findOne({ pageName: "projects" });
      if(banners){
        return NextResponse.json({ data: banners, success: true }, { status: 200 });
      }
    } catch (error) {
      console.log("Error fetching banners:", error);
      return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
    }
  }

