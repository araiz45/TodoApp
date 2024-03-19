import mongoose from "mongoose";

export default async function mongoDB() {
  try {
    if (process.env.mongoUrl !== undefined) {
      const connection = await mongoose.connect(process.env.mongoUrl);
      console.log("Connection Successfull");
    }
  } catch (error) {
    console.log("Connection Failed", error);
  }
}
