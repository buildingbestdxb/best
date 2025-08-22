import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await connectDB();
      const projects = await Project.find().sort({index:1});
      return NextResponse.json({ projects, success: true }, { status: 200 });
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
  }