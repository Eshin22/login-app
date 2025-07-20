import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";
import mongoose from "mongoose";

export async function PUT(req: Request) {
  await connectMongoDB();
  try {
    const { paperId, comment, teacher } = await req.json();

    if (!paperId || !comment?.trim()) {
      return NextResponse.json(
        { message: "Paper ID and comment are required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return NextResponse.json(
        { message: "Invalid Paper ID format" },
        { status: 400 }
      );
    }

    const paper = await Paper.findById(paperId);
    if (!paper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    if (!paper.teacherComments) {
      paper.teacherComments = [];
    }

    paper.teacherComments.push({
      teacher: teacher || "Teacher", // ✅ add teacher name if needed
      comment: comment.trim(),
      createdAt: new Date(),
    });

    await paper.save();

    return NextResponse.json(
      { message: "Comment added successfully", teacherComments: paper.teacherComments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { message: "Failed to add comment" },
      { status: 500 }
    );
  }
}
