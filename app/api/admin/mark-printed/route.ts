import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function PUT(req: Request) {
  await connectMongoDB();
  const { paperId } = await req.json();
  const updatedPaper = await Paper.findByIdAndUpdate(
    paperId,
    { status: "printed" },
    { new: true }
  );
  return NextResponse.json(updatedPaper);
}
export async function GET() {
  try {
    await connectMongoDB();
    const printedPapers = await Paper.find({ status: "printed" });
    return NextResponse.json(printedPapers, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch printed papers" },
      { status: 500 }
    );
  }
}
