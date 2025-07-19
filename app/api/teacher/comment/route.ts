import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function PUT(req: Request) {
  await connectMongoDB();
  try {
    const { paperId, teacher, comment } = await req.json();

    if (!paperId || !teacher || !comment) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const paper = await Paper.findById(paperId);
    if (!paper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    // ✅ Add teacher comment to comments array
    paper.comments.push({
      reviewer: teacher,
      comment: comment.trim(),
      createdAt: new Date(),
    });

    await paper.save();

    return NextResponse.json(
      { message: "Comment added successfully", paper },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding teacher comment:", error);
    return NextResponse.json(
      { message: "Failed to add comment" },
      { status: 500 }
    );
  }
}
