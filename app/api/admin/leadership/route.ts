import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Leadership from "@/models/LeaderShip";
import { verifyAdmin } from "@/lib/verifyAdmin";


export async function GET() {
    try {
        await connectDB();
        const leaderShip = await Leadership.findOne({});
        if (!leaderShip) {
            return NextResponse.json({ message: "Leadership not found" }, { status: 404 });
        }
        return NextResponse.json({data:leaderShip,message:"Leadership fetched successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const isAdmin = await verifyAdmin(request);
        if (!isAdmin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await connectDB();
        const leadership = await Leadership.findOneAndUpdate({}, body,{upsert:true,new:true});
        if (!leadership) {
            return NextResponse.json({ message: "Leadership not found" }, { status: 404 });
        }
        return NextResponse.json({data:leadership,message:"Leadership updated successfully"}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}