import { connectMongoDB }  from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

interface RegisterRequestBody {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface RegisterResponse {
    message: string;
    user?: unknown;
}

export async function POST(req: Request): Promise<Response> {
    await  connectMongoDB();
    const { name, email, password, role }: RegisterRequestBody = await req.json();

    const userExist = await User.findOne({ email });
    if (userExist) {
        const response: RegisterResponse = { message: "User already exists" };
        return new Response(JSON.stringify(response), { status: 400 });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    const response: RegisterResponse = { message: "User registered", user: newUser };
    return new Response(JSON.stringify(response), { status: 201 });
}
