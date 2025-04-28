import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import ContactMeta from "@/models/ContactMeta";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    
    try {
      await connectDB();

      const formData = await request.formData();
      const metaTitle = formData.get("metaTitle");
      const metaDescription = formData.get("metaDescription");
       const contact = await ContactMeta.findOne({})
       if(!contact) {
        return NextResponse.json({ error: "Contact not found" }, { status: 404 });
       }
       contact.metaTitle = metaTitle
       contact.metaDescription = metaDescription
       await contact.save()
       return NextResponse.json({ message: "Meta data saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving meta data:", error)
        return NextResponse.json({ error: "Failed to save meta data" }, { status: 500 });
    }
}

export async function GET(){
    try {
        await connectDB();
        const contact = await ContactMeta.findOne({})
        if(!contact) {
            return NextResponse.json({ error: "Meta data not found" }, { status: 404 });
        }
        return NextResponse.json({ contact }, { status: 200 });
    } catch (error) {
        console.log("Error fetching meta data:", error)
        return NextResponse.json({ error: "Failed to fetch meta data" }, { status: 500 });
    }
}