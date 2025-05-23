import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Careers from "@/models/Careers";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const slug = searchParams.get("slug");

  await connectDB();
  if(slug){
    const career = await Careers.findOne({slug});
    return NextResponse.json({ data: career, success: true }, { status: 200 });
  }
  const career = await Careers.findById(id);
  return NextResponse.json({ data: career, success: true }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id)
  const { title, slug, department, location, applyLink, datePosted,type,description,experience,responsibilities } = await request.json();
  const career = await Careers.findByIdAndUpdate(id, { title, slug, department, location, applyLink, datePosted ,type,description,experience,responsibilities});
  return NextResponse.json({ data: career, success: true }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const isAdmin = await verifyAdmin(request);

  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const career = await Careers.findByIdAndDelete(id);
  return NextResponse.json({ data: career, success: true }, { status: 200 });
}
