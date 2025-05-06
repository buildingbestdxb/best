import { NextRequest, NextResponse } from "next/server";
import News from "@/models/News";
import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug")

  await connectDB();
  if(slug){
    const news = await News.findOne({ slug });
    return NextResponse.json({ data: news, success: true }, { status: 200 });
  }
  const news = await News.findById(id);
  return NextResponse.json({ data: news, success: true }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const { title, slug, description, images, tags, date, metaTitle, metaDescription, altTag, type } = await request.json();
  const news = await News.findByIdAndUpdate(id, { title, slug, description, images, tags, date, metaTitle, metaDescription, altTag, type });
  return NextResponse.json({ data: news, success: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const news = await News.findByIdAndDelete(id);
  return NextResponse.json({ data: news, success: true }, { status: 200 });
}
