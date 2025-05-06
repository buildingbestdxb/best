import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import About from "@/models/About";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
  
    if (!isAdmin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      const {searchParams} = new URL(request.url)
      const id = searchParams.get("id")
      const formData = await request.formData();
      const cardTitle = formData.get("cardTitle")
      const cardLogo = formData.get("cardLogo")
      const cardLogoAlt = formData.get("cardLogoAlt")

      console.log(cardTitle,cardLogo)

      const about = await About.findOne()
      if(about){
        const toBeEditedItem = about.core_value.cards.find((item:{_id:string})=>item._id==id)
        if(toBeEditedItem){
            toBeEditedItem.title = cardTitle;
            toBeEditedItem.logo = cardLogo;
            toBeEditedItem.logoAlt = cardLogoAlt;
            await about.save()
            return NextResponse.json({ message: "Content updated successfully", success: true }, { status: 201 });
        }
        
      }
    } catch (error) {
      console.error("Error editing content:", error);
      return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
    }
  }