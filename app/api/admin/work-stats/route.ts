// app/api/admin/work-stats/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  await connectMongoDB();
  try {
    const total = await Paper.countDocuments();
    const draft = await Paper.countDocuments({ status: "draft" });
    const reviewed = await Paper.countDocuments({ status: "reviewed" });
    const printed = await Paper.countDocuments({ status: "printed" });

    const avgReviewTime = await Paper.aggregate([
      {
        $match: { reviewCount: { $gt: 0 } },
      },
      {
        $project: {
          timeTaken: { $subtract: ["$updatedAt", "$createdAt"] },
        },
      },
      {
        $group: {
          _id: null,
          avgTime: { $avg: "$timeTaken" },
        },
      },
    ]);

    return NextResponse.json(
      {
        total,
        draft,
        reviewed,
        printed,
        avgReviewTime: avgReviewTime[0]?.avgTime || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching work stats:", error);
    return NextResponse.json({ message: "Failed to fetch work stats" }, { status: 500 });
  }
}
