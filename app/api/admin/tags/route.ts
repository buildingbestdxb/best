import connectDB from "@/lib/mongodb";
import Tags from "@/models/Tags";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { headerScript, bodyScript } = body;
        const tag = await Tags.findOne({});
        if(tag){
            tag.headerScript = headerScript;
            tag.bodyScript = bodyScript;
            await tag.save();
            return NextResponse.json({ message: "Tag updated successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "Tag saved successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error saving tag", error);
        return NextResponse.json({ message: "Failed to save tag" }, { status: 500 });
    }
}


export async function GET(){
    try {
        await connectDB();
        const tag = await Tags.findOne({});
        return NextResponse.json({ tag }, { status: 200 });
    } catch (error) {
        console.log("Error fetching tag", error);
        return NextResponse.json({ message: "Failed to fetch tag" }, { status: 500 });
    }
}