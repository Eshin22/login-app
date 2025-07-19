// app/api/admin/work-progress/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  await connectMongoDB();
  try {
    const papers = await Paper.find().populate("collectionId");
    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching work progress:", error);
    return NextResponse.json({ message: "Failed to fetch work progress" }, { status: 500 });
  }
}
