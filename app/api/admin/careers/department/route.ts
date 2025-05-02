import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Department from "@/models/Department";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Careers from "@/models/Careers";
import mongoose from "mongoose";

export async function GET(){
    try {
        await connectDB();
        const department = await Department.find();
        if(!department){
            return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
        }
        return NextResponse.json({ data: department, success: true }, { status: 200 });
    } catch (error) {
        console.log("Failed to fetch data:", error)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}

export async function POST(request:NextRequest){
    try {
        await connectDB();
        const {name} = await request.json()
        const department = await Department.create({name})
        if(!department){
            return NextResponse.json({ error: "Failed to create data" }, { status: 500 })
        }
        return NextResponse.json({ message: "Department created successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log("Failed to create data:", error)
        return NextResponse.json({ error: "Failed to create data" }, { status: 500 })
    }
}

export async function PATCH(request:NextRequest){
    const session = await mongoose.startSession()
    try {
        const isAdmin = await verifyAdmin(request)
        if(!isAdmin){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const searchParams = new URL(request.url).searchParams
        const id = searchParams.get("id")
        await connectDB();
        session.startTransaction()
        const department = await Department.findById(id)
        const {name} = await request.json()
        if(!department){
            return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
        }
        const careers = await Careers.find({department:department.name})
        careers.forEach((career) => {
            career.department = name
            career.save()
        })
        department.name = name
        await department.save()
        session.commitTransaction()
        session.endSession()
        return NextResponse.json({ message: "Department updated successfully", success: true }, { status: 200 });
    } catch (error) {
        session.abortTransaction()
        session.endSession()
        console.log("Failed to update data:", error)
        return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
    }
}

export async function DELETE(request:NextRequest){
    const session = await mongoose.startSession()
    try {
        const isAdmin = await verifyAdmin(request)
        if(!isAdmin){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const searchParams = new URL(request.url).searchParams
        const id = searchParams.get("id")
        await connectDB();
        session.startTransaction()
        const department = await Department.findByIdAndDelete(id)
        const careers = await Careers.find({department:department.name})
        careers.forEach((career) => {
            career.department = ""
            career.save()
        })
        if(!department){
            session.abortTransaction()
            session.endSession()
            return NextResponse.json({ error: "Failed to delete data" }, { status: 500 })
        }
        session.commitTransaction()
        session.endSession()
        return NextResponse.json({ message: "Department deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        session.abortTransaction()
        session.endSession()
        console.log("Failed to delete data:", error)
        return NextResponse.json({ error: "Failed to delete data" }, { status: 500 })
    }
}

