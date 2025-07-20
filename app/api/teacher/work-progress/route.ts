import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

// ✅ Fetch work progress
export async function GET() {
  await connectMongoDB();
  try {
    const papers = await Paper.find(
      { status: { $in: ["draft", "reviewed"] } }, // exclude printed papers
      "title subject reviewer status driveLink comments teacherComments"
    ).populate("collectionId");

    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching work progress:", error);
    return NextResponse.json(
      { message: "Failed to fetch work progress" },
      { status: 500 }
    );
  }
}

// ✅ Add teacher comment
export async function PUT(req: Request) {
  await connectMongoDB();
  try {
    const { paperId, teacherComment } = await req.json();
    if (!paperId || !teacherComment) {
      return NextResponse.json(
        { message: "Paper ID and comment are required" },
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
      comment: teacherComment.trim(),
      createdAt: new Date(),
    });

    await paper.save();
    return NextResponse.json(
      { message: "Comment added successfully" },
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
