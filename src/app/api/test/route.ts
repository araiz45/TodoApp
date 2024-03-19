import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "Gill",
    age: 44,
  };
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  return NextResponse.json({ data });
}
