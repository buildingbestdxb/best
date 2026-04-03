import connectDB from "../lib/mongodb";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("B#$t@dmiN25", 10);

    await Admin.create({
      username: "admin",
      password: hashedPassword,
    });

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin();
