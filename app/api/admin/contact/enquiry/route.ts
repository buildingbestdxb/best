import ContactTemplate from "@/emails/ContactTemplate";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
        phone,
        message } = await request.json();

      const enquiry = await Enquiry.create({ name,email,subject,phone,message });
      if(enquiry){
        await resend.emails.send({
          from: `Best BCC <noreply@bestbcc.com>`,
          to: ['info@bestbcc.com'],
          subject: 'Enquiry from website [bestbcc.com]',
          react: ContactTemplate({ name, email, phone, subject, message }),
          replyTo: email,
      });
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