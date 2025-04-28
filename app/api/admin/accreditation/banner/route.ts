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
      const {bannerImage, bannerAlt, pageName} = await request.json()
    //   const accreditationBanner = await Banner.findOneAndUpdate({pageName},{$set:{image:bannerImage,alt:bannerAlt}});
    const accreditationBanner = await Banner.create({
        image: bannerImage,
        alt: bannerAlt,
        pageName: pageName
      })
    if(accreditationBanner){
        return NextResponse.json({ message: "Banner updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error updating accreditation banner:", error);
      return NextResponse.json({ error: "Failed to update accreditation banner" }, { status: 500 });
    }
  }


export async function GET(){
    try {
      await connectDB();
      const banner = await Banner.find({pageName:"accreditation"});
      if(banner){
        return NextResponse.json({ data: banner, success: true }, { status: 200 });
      }
    } catch (error) {
      console.error("Error fetching accreditation banner:", error);
      return NextResponse.json({ error: "Failed to fetch accreditation banner" }, { status: 500 });
    }
  }

