import { NextRequest, NextResponse } from "next/server";
import Project from "@/models/Project";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
await connectDB();
const session = await mongoose.startSession();
try {
    session.startTransaction();

    const formData = await req.formData();
    const projects = formData.get("projects") as string;
    const actualProjects = JSON.parse(projects);

    await Promise.all(
      actualProjects.map((project: { _id: string; index: number }) =>
        Project.findByIdAndUpdate(
          project._id,
          { $set: { index: project.index } },
          { new: true } 
        )
      )
    );

    await session.commitTransaction(); 
    return NextResponse.json(
      { message: "Projects reordered successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    await session.abortTransaction(); 
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
