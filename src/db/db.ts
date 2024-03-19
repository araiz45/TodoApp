import mongoose from "mongoose";

export default async function mongoDB() {
  try {
    if (process.env.mongoUrl !== undefined) {
      const connection = await mongoose.connect(
        process.env.mongoUrl ||
          "mongodb+srv://araiz:araiz@cluster0.mn5uyv5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("Connection Successfull");
    }
  } catch (error) {
    console.log("Connection Failed", error);
  }
}
