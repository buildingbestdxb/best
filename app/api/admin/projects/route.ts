import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request:NextRequest) {
  try {
    await connectDB();
    const {searchParams} = new URL(request.url)
    const type = searchParams.get("type")

    if(type){
      const projects = await Project.find({type});
      return NextResponse.json({ data: projects, success: true }, { status: 200 });
    }

    const projects = await Project.find();
    return NextResponse.json({ data: projects, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { name, description, images, specifications,type,location,thumbnail,bannerImage } = await request.json();
    const project = await Project.create({ name, description, images, specifications,type,location,thumbnail,bannerImage });
    return NextResponse.json({ data: project, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}



