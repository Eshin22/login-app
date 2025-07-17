import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET(req: Request) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const reviewer = searchParams.get("reviewer");
  const papers = await Paper.find({ reviewer, status: { $in: ["draft", "reviewed"] } });
  return NextResponse.json(papers);
}
