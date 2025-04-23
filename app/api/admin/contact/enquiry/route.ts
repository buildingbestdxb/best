import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    await connectDB();
    const enquiry = await Enquiry.find();
    return NextResponse.json({ data:enquiry , success: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
    try {
      
        const { name,
        email,
        subject,
        message } = await request.json();

      const enquiry = await Enquiry.create({ name,email,subject,message });
      if(enquiry){
        return NextResponse.json({ message:"Thank you, we will get back to you soon", success: true }, { status: 200 });
      }else{
        return NextResponse.json({ message:"Sorry,we coudn't process that request at the moment, try again later", success: false }, { status: 400 });
      }
      
    
    } catch (error) {
      console.error("Error creating enquiry:", error);
      return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
    }
  }


  export async function DELETE(request: NextRequest) {
    try {
      
        const {searchParams} = new URL(request.url)
        const id = searchParams.get("id")

      const enquiry = await Enquiry.findByIdAndDelete({_id:id});
      if(enquiry){
        return NextResponse.json({ message:"Enquiry removed successfully", success: true }, { status: 200 });
      }else{
        return NextResponse.json({ message:"Removing enquiry failed", success: false }, { status: 400 });
      }
      
    
    } catch (error) {
      console.error("Error removing enquiry:", error);
      return NextResponse.json({ error: "Failed to remove enquiry" }, { status: 500 });
    }
  }