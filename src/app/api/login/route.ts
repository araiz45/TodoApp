"use server";
import mongoDB from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { IncomingMessage } from "http";
mongoDB();

export async function POST(req: NextRequest) {
  const secret = process.env.JWTSECRET || "LSDJF;SDLFJ";
  const { username, password } = await req.json();
  console.log(username, password);
  try {
    const existedUser = await User.find({ name: username });
    console.log(existedUser[0]);
    const comparePassword = await bcrypt.compare(
      password,
      existedUser[0].password
    );
    console.log(comparePassword);
    if (!comparePassword) {
      return NextResponse.json({ message: "bad reqests" }, { status: 400 });
    }
    const payload = {
      name: existedUser[0].name,
      id: existedUser[0]._id,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
    cookies().set("token", token);
    return NextResponse.json({ message: "done" });
  } catch (error) {
    return NextResponse.json({ message: "wrong" }, { status: 500 });
  }
}
