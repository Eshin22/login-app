import { NextResponse } from "next/server";
import { connectMongoDB } from "@/utils/db";
import Collection from "@/models/collection";

export async function GET() {
  await connectMongoDB();
  const collections = await Collection.find();
  return NextResponse.json(collections);
}

export async function POST(req: Request) {
  await connectMongoDB();
  const { name } = await req.json();
  const collection = await Collection.create({ name });
  return NextResponse.json(collection, { status: 201 });
}
export async function DELETE(req: Request) {
  await connectMongoDB();
  const { id } = await req.json();
  await Collection.findByIdAndDelete(id);
  return NextResponse.json({ message: "Collection deleted" }, { status: 200 });
}