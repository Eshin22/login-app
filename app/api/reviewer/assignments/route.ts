import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Assignment from "@/models/assignment";

export async function GET() {
  try {
    await connectMongoDB();
    const assignments = await Assignment.find({ status: "pending" });
    return NextResponse.json(assignments, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch assignments" }, { status: 500 });
  }
}
