import connectDB from "../lib/mongodb";
import Home from "../models/Tags";

async function seedHome() {
    try {
        await connectDB();

        const existing = await Home.findOne();
        if (existing) {
            console.log("Home collection already exists with data");
            return;
        }

        await Home.create({
            headerScript: "",
            bodyScript: "",
        });

        console.log("✅ Home collection created successfully");
    } catch (error) {
        console.error("❌ Error creating Home collection:", error);
    }
}

seedHome();