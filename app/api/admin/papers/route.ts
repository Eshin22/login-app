import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Paper from "@/models/paper";

export async function GET() {
  try {
    await connectMongoDB();
    const papers = await Paper.find().populate("collectionId");
    return NextResponse.json(papers, { status: 200 });
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      { message: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const collectionId = formData.get("collectionId") as string;
    const driveLink = formData.get("driveLink") as string;

    console.log("Received form data:", {
      title,
      subject,
      collectionId,
      driveLink: driveLink || "No drive link",
    });

    if (!title || !subject || !collectionId) {
      return NextResponse.json(
        { message: "Title, subject, and collection are required" },
        { status: 400 }
      );
    }

    // Optional: Validate Google Drive link format if provided
    if (
      driveLink &&
      driveLink.trim() !== "" &&
      !driveLink.includes("drive.google.com")
    ) {
      console.log("Warning: Non-Google Drive link provided:", driveLink);
      // Still allow the paper to be created, but log a warning
    }

    const paper = await Paper.create({
      title,
      subject,
      collectionId,
      driveLink: driveLink || "", // Store drive link instead of pdfUrl
    });

    console.log("Paper created successfully:", paper._id);
    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    console.error("Error creating paper:", error);
    return NextResponse.json(
      { message: "Failed to add paper" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectMongoDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Paper ID is required" },
        { status: 400 }
      );
    }

    await Paper.findByIdAndDelete(id);
    return NextResponse.json({ message: "Paper deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting paper:", error);
    return NextResponse.json(
      { message: "Failed to delete paper" },
      { status: 500 }
    );
  }
}
