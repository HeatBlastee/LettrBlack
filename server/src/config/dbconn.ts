import mongoose from "mongoose";

export const ConnectDb = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/LettrBlack");

    console.log("✅ MongoDB Connected");
  } catch (error: any) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1); 
  }
};
