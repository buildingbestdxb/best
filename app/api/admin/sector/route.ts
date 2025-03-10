import connectDB from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Project from "@/models/Project";
import Sector from "@/models/Sector";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
    try {
        await connectDB();
        const sector = await Sector.find();
        return NextResponse.json({ data: sector, success: true }, { status: 200 });
    } catch (error) {
        console.error("Error fetching sector:", error);
        return NextResponse.json({ error: "Failed to fetch sector" }, { status: 500 });
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
        const name = formData.get("name")
        const image = formData.get("image")
        const sector = await Sector.create({ name, image });
        if (sector) {
            return NextResponse.json({ message: "Sector added successfully", success: true }, { status: 201 });
        }
    } catch (error) {
        console.error("Error adding sector:", error);
        return NextResponse.json({ error: "Failed to add sector" }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start the transaction

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        const formData = await request.formData();
        const name = formData.get("name");
        const oldName = formData.get("oldName");
        const image = formData.get("image");

        // Update projects that belong to the old sector name
        const projects = await Project.find({ type: oldName }).session(session);
        for (const item of projects) {
            item.type = name; // Updating type
            await item.save({ session }); // Saving within transaction
        }

        // Update the sector
        const sector = await Sector.findByIdAndUpdate(
            id,
            { $set: { name, image } },
            { new: true, session } // Ensure the update is part of the transaction
        );

        if (!sector) {
            throw new Error("Sector not found"); // If sector not found, trigger rollback
        }

        await session.commitTransaction(); // Commit changes
        session.endSession();

        return NextResponse.json(
            { message: "Sector updated successfully", success: true },
            { status: 201 }
        );

    } catch (error) {
        await session.abortTransaction(); // Rollback changes on error
        session.endSession();

        console.error("Error updating sector:", error);
        return NextResponse.json({ error: "Failed to update sector" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
        await connectDB();
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        const session = await mongoose.startSession(); // Start a session
        session.startTransaction();
        const sector = await Sector.findByIdAndDelete({ _id: id }).session(session);
        if (sector) {
            const projects = await Project.find();
            for (const item of projects) {
                if (item.type === sector.name) {
                    item.type = "no-type"; // Or null, depending on your requirement
                    await item.save(); // Save changes to the database
                }
            }
            await session.commitTransaction(); // Commit changes
            session.endSession();
            return NextResponse.json({ message: "Sector deleted successfully", success: true }, { status: 201 });
        }
    } catch (error) {
        console.error("Error deleting sector:", error);
        return NextResponse.json({ error: "Failed to delete sector" }, { status: 500 });
    }
}