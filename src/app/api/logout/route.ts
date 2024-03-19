import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    cookies().delete("token");
    return NextResponse.json({ message: "done" });
  } catch (error) {
    return NextResponse.json({ message: "undone" }, { status: 500 });
  }
}
