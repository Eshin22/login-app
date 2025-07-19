// app/api/admin/printed-papers/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  await connectMongoDB();
  try {
    const papers = await Paper.find({ status: "printed" }).populate("collectionId");
    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching printed papers:", error);
    return NextResponse.json({ message: "Failed to fetch printed papers" }, { status: 500 });
  }
}
