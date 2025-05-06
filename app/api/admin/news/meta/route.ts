import connectDB from "@/lib/mongodb";
import NewsMeta from "@/models/NewsMeta";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const {metaTitle, metaDescription} = await request.json();
        const news = await NewsMeta.findOne({});
        if(!news){
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }
        news.metaTitle = metaTitle;
        news.metaDescription = metaDescription;
        await news.save();
        return NextResponse.json({ data: news,message:"News meta updated successfully", success: true }, { status: 200 });
    } catch (error) {
        console.error("Error updating news meta:", error);
        return NextResponse.json({ error: "Failed to update news meta" }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        const news = await NewsMeta.findOne({});
        if(!news){
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }
        return NextResponse.json({ data: news, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching news meta:", error);
        return NextResponse.json({ error: "Failed to fetch news meta" }, { status: 500 });
    }
}


