import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import User from "@/models/user";

export async function PUT(req: Request) {
  try {
    await connectMongoDB();
    const { userId, role } = await req.json();

    if (!["teacher", "reviewer", "unassigned"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error assigning role:", error);
    return NextResponse.json({ message: "Failed to assign role" }, { status: 500 });
  }
}
