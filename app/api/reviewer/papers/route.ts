import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import mongoose from "mongoose";
import Paper from "@/models/paper";

// ✅ GET all assigned papers for a reviewer
export async function GET(req: Request) {
  await connectMongoDB();
  try {
    const { searchParams } = new URL(req.url);
    const reviewer = searchParams.get("reviewer");

    if (!reviewer) {
      return NextResponse.json({ message: "Reviewer is required" }, { status: 400 });
    }

    // ✅ Case-insensitive search for reviewer
    const papers = await Paper.find({
      reviewer: { $regex: new RegExp(`^${reviewer}$`, "i") },
    }).populate("collectionId");

    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviewer papers:", error);
    return NextResponse.json(
      { message: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE paper review details
export async function PUT(req: Request) {
  await connectMongoDB();
  try {
    const { paperId, reviewer, comments, reviewLink, reviewCount } = await req.json();

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return NextResponse.json({ message: "Invalid paper ID" }, { status: 400 });
    }

    const paper = await Paper.findById(paperId);
    if (!paper) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    // ✅ Check review limit
    if (paper.reviewCount >= 3 && reviewCount > paper.reviewCount) {
      return NextResponse.json(
        { message: "This paper has already been reviewed 3 times." },
        { status: 400 }
      );
    }

    // ✅ Add or update comments
    if (comments?.trim()) {
      const existingCommentIndex = paper.comments.findIndex(
        (c: any) => c.reviewer.toLowerCase() === reviewer.toLowerCase()
      );

      if (existingCommentIndex >= 0) {
        // ✅ Update only this reviewer's comment
        paper.comments[existingCommentIndex].comment = comments.trim();
        paper.comments[existingCommentIndex].createdAt = new Date();
      } else {
        paper.comments.push({
          reviewer,
          comment: comments.trim(),
          createdAt: new Date(),
        });
      }
    }

    // ✅ Update review link if provided
    if (reviewLink?.trim()) {
      paper.reviewLink = reviewLink.trim();
    }

    // ✅ Update review count and status
    paper.reviewCount =
      reviewCount && reviewCount > 0 ? reviewCount : paper.comments.length;
    paper.status = paper.reviewCount > 0 ? "reviewed" : paper.status;

    await paper.save();

    return NextResponse.json(
      { message: "Review updated successfully", paper },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reviewing paper:", error);
    return NextResponse.json(
      { message: "Failed to update review" },
      { status: 500 }
    );
  }
}
