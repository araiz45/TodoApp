import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: { json: () => void }) {
  try {
    cookies().delete("token");
    return NextResponse.json({ message: "done" });
  } catch (error) {
    return NextResponse.json({ message: "undone" }, { status: 500 });
  }
}
