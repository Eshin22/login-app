import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function PUT(req: Request) {
  await connectMongoDB();
  try {
    const { paperId, adminComment, reviewLink } = await req.json();

    const paper = await Paper.findById(paperId);
    if (!paper)
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });

    if (reviewLink?.trim()) {
      paper.reviewLink = reviewLink.trim();
    }

    if (adminComment?.trim()) {
      paper.comments.push({
        reviewer: "Admin",
        comment: adminComment.trim(),
        createdAt: new Date(),
      });
    }

    // ✅ If 3 reviews done, keep it "reviewed" or later mark printed
    if (paper.reviewCount >= 3) {
      paper.status = "reviewed";
    }

    await paper.save();

    return NextResponse.json(
      { message: "Paper updated successfully", paper },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating paper:", error);
    return NextResponse.json(
      { message: "Failed to update paper" },
      { status: 500 }
    );
  }
}
