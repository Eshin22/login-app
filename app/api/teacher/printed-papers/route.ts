import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  await connectMongoDB();
  const papers = await Paper.find({ status: "printed" }).populate("collection");
  return NextResponse.json(papers);
}
