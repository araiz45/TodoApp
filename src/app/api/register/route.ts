"use server";
import mongoDB from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
mongoDB();
export async function POST(req: NextRequest) {
  const secret = process.env.JWTSECRET || "LSDJF;SDLFJ";
  try {
    const { username, password } = await req.json();
    const existedUser = await User.findOne({ name: username });
    if (existedUser) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    const newUser = new User({ name: username, password: hashPassword });
    console.log(newUser);
    await newUser.save();
    const payload = { id: newUser._id, name: newUser.name };
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });
    cookies().set("token", token);
    console.log(username, password);

    return NextResponse.json({ username, password });
  } catch (error) {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
