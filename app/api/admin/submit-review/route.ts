import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function PUT(req: Request) {
  try {
    await connectMongoDB();
    const { paperId, comments, reviewer } = await req.json();

    // Validate required fields
    if (!paperId) {
      return NextResponse.json(
        { message: "Paper ID is required" },
        { status: 400 }
      );
    }

    if (!reviewer) {
      return NextResponse.json(
        { message: "Reviewer name is required" },
        { status: 400 }
      );
    }

    if (!comments || comments.trim() === "") {
      return NextResponse.json(
        { message: "Comments are required" },
        { status: 400 }
      );
    }

    // Find the paper and add the comment to the comments array
    const paper = await Paper.findById(paperId);
    if (!paper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    // Check if reviewer already has a comment, update or add new
    const existingCommentIndex = paper.comments.findIndex(
      (c: any) => c.reviewer === reviewer
    );

    if (existingCommentIndex >= 0) {
      // Update existing comment
      paper.comments[existingCommentIndex].comment = comments.trim();
      paper.comments[existingCommentIndex].createdAt = new Date();
    } else {
      // Add new comment to the comments array
      paper.comments.push({
        reviewer,
        comment: comments.trim(),
        createdAt: new Date(),
      });
    }

    paper.status = "reviewed";
    paper.reviewCount = paper.comments.length;

    await paper.save();

    return NextResponse.json(paper);
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { 
        message: "Failed to submit review", 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
