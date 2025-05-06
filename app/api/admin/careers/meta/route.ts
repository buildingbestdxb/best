import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import CareerMeta from "@/models/CareerMeta";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const formData = await request.formData()
      const metaTitle = formData.get("metaTitle")
      const metaDescription = formData.get("metaDescription")
      const careersMeta = await CareerMeta.findOne({});
      if(careersMeta){
        careersMeta.metaTitle = metaTitle;
        careersMeta.metaDescription = metaDescription;
        await careersMeta.save();
        return NextResponse.json({ message: "Meta updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error updating meta:", error);
      return NextResponse.json({ error: "Failed to update meta" }, { status: 500 });
    }
  }

  export async function GET() {
    try {
      await connectDB();
      const careersMeta = await CareerMeta.findOne();
      if (careersMeta) {
        return NextResponse.json({ data: careersMeta, success: true }, { status: 200 });
      }
    } catch (error) {
      console.error("Error fetching meta:", error);
      return NextResponse.json({ error: "Failed to fetch meta" }, { status: 500 });
    }
  }
