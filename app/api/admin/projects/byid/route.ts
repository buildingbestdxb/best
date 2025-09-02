import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    await connectDB();
    if(slug){
      const project = await Project.findOne({slug});
    return NextResponse.json({ data: project, success: true }, { status: 200 });
    }else{
      const project = await Project.findById(id);
      return NextResponse.json({ data: project, success: true }, { status: 200 });
    }
    
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectDB();
    const { name, slug, description, images, specifications,type,location,thumbnail,thumbnailAlt,bannerImage,bannerAlt,status,metaTitle,metaDescription } = await request.json();
    const project = await Project.findByIdAndUpdate(id, { name, slug, description, images, specifications, type, location,thumbnail,thumbnailAlt,bannerImage,bannerAlt,status,metaTitle,metaDescription }, { new: true });
    return NextResponse.json({ data: project, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectDB();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await connectDB();
    const project = await Project.findById(id);
    if(!project.hidden){
      project.hidden = true;
      await project.save();
      return NextResponse.json({ data: project, success: true, message: "Project hidden successfully" }, { status: 200 });
    }else{
      project.hidden = false;
      await project.save();
      return NextResponse.json({ data: project, success: true, message: "Project unhidden successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

