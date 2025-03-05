import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
      await connectDB();
      const contact = await Contact.find();
      return NextResponse.json({ data: contact, success: true }, { status: 200 });
    } catch (error) {
      console.error("Error fetching contact:", error);
      return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
    }
  }


export async function POST(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const formData = await request.formData()
      const region = formData.get("region")
      const phone = formData.get("phone")
      const fax = formData.get("fax")
      const mail = formData.get("mail")
      const address_card = formData.get("address_card")
      const address = formData.get("address")
      const contact = await Contact.create({region,phone,fax,mail,address_card,address});
      if(contact){
        return NextResponse.json({ message: "Region added successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error adding region:", error);
      return NextResponse.json({ error: "Failed to add region" }, { status: 500 });
    }
  }


  export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const {searchParams} = new URL(request.url)
      const id = searchParams.get("id")
      const formData = await request.formData()
      const region = formData.get("region")
      const phone = formData.get("phone")
      const fax = formData.get("fax")
      const mail = formData.get("mail")
      const address_card = formData.get("address_card")
      const address = formData.get("address")
      const contact = await Contact.findByIdAndUpdate({_id:id},{$set:{region,phone,fax,mail,address_card,address}});
      if(contact){
        return NextResponse.json({ message: "Region updated successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error updating region:", error);
      return NextResponse.json({ error: "Failed to update region" }, { status: 500 });
    }
  }


  export async function DELETE(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const {searchParams} = new URL(request.url)
      const id = searchParams.get("id")
      const contact = await Contact.findByIdAndDelete({_id:id});
      if(contact){
        return NextResponse.json({ message: "Region deleted successfully", success: true }, { status: 201 });
      }
    } catch (error) {
      console.error("Error deleting region:", error);
      return NextResponse.json({ error: "Failed to delete region" }, { status: 500 });
    }
  }