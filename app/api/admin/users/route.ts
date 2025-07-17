import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import User from "@/models/user";

export async function GET() {
  try {
    await connectMongoDB();
    const teachers = await User.find({ role: "teacher" });
    const reviewers = await User.find({ role: "reviewer" });
    const unassigned = await User.find({ role: "unassigned" });

    return NextResponse.json({ teachers, reviewers, unassigned }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}
