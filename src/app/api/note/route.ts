import mongoDB from "@/db/db";
import Note from "@/models/Notes";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

mongoDB();
export async function POST(req: { json: () => any }) {
  try {
    const { title, userId, desc } = await req.json();
    console.log(title, userId, desc);
    const note = new Note({
      note: title,
      desc,
      userId: userId,
    });
    const noted = await note.save();
    console.log(noted);
    return NextResponse.json({ title, userId, desc });
  } catch (error) {}
}

export async function GET(req: { json: () => any }) {
  const secret = process.env.JWTSECRET || "LSDJF;SDLFJ";
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { message: "There is no Token go back" },
        { status: 400 }
      );
    }
    const tokenValue = token.value;
    const dataJwt: string | JwtPayload = await jwt.verify(tokenValue, secret);

    const jwtPayload = dataJwt as JwtPayload;

    const notes = await Note.find({ userId: jwtPayload.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ data: notes });
  } catch (error) {
    return NextResponse.json({ message: "bad" }, { status: 500 });
  }
}
