import mongoDB from "@/db/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

mongoDB();
export async function POST(req: { json: () => any }) {
  try {
    const { username, password } = await req.json();
    const existedUser = await User.findOne({ name: username });
    if (existedUser) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    }
    const newUser = new User({ name: username, password });
    await newUser.save();
    console.log(username, password);
    return NextResponse.json({ username, password });
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
