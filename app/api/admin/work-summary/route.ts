import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  await connectMongoDB();
  try {
    // Group papers by reviewer
    const reviewers = await Paper.aggregate([
      {
        $group: {
          _id: "$reviewer",
          totalAssigned: { $sum: 1 },
          reviewed: {
            $sum: { $cond: [{ $eq: ["$status", "reviewed"] }, 1, 0] },
          },
          printed: {
            $sum: { $cond: [{ $eq: ["$status", "printed"] }, 1, 0] },
          },
          avgReviewCount: { $avg: "$reviewCount" },
          papers: {
            $push: {
              title: "$title",
              status: "$status",
              reviewCount: "$reviewCount",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json(reviewers, { status: 200 });
  } catch (error) {
    console.error("Error fetching work summary:", error);
    return NextResponse.json(
      { message: "Failed to fetch work summary" },
      { status: 500 }
    );
  }
}
