import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function PUT(req: Request) {
  await connectMongoDB();
  const { paperId, reviewer } = await req.json();
  const updatedPaper = await Paper.findByIdAndUpdate(
    paperId,
    { reviewer, status: "draft" },
    { new: true }
  );
  return NextResponse.json(updatedPaper);
}
