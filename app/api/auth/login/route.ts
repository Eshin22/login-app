import { connectMongoDB } from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string | undefined;

export async function POST(req: { json: () => PromiseLike<{ email: any; password: any; }> | { email: any; password: any; }; }) {
  await connectMongoDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 });
  }

  if (!JWT_SECRET) {
    return new Response(JSON.stringify({ message: "JWT secret not configured" }), { status: 500 });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return new Response(
    JSON.stringify({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    }),
    { status: 200 }
  );
}
