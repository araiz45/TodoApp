import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const secret = process.env.JWTSECRET || "LSDJF;SDLFJ";
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
    const decodeValues = await jwt.verify(tokenValue, secret);
    console.log(decodeValues);
    return NextResponse.json(decodeValues);
  } catch (error) {
    return NextResponse.json({ message: "good" }, { status: 401 });
  }
}
