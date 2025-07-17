import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  try {
    await connectMongoDB();
    const papers = await Paper.find().populate("collectionId"); // ✅ populate with new field name
    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json({ message: "Failed to fetch papers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { title, subject, collectionId } = await req.json();

    if (!title || !subject || !collectionId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const paper = await Paper.create({ title, subject, collectionId });
    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    console.error("Error adding paper:", error);
    return NextResponse.json({ message: "Failed to add paper" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectMongoDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Paper ID is required" }, { status: 400 });
    }

    await Paper.findByIdAndDelete(id);
    return NextResponse.json({ message: "Paper deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting paper:", error);
    return NextResponse.json({ message: "Failed to delete paper" }, { status: 500 });
  }
}
