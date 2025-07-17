import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import User from "@/models/user";

export async function DELETE(req: Request) {
  try {
    await connectMongoDB();
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
