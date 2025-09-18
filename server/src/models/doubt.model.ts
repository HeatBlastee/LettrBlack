import mongoose, { Document, Schema, Types } from "mongoose";

export interface Doubts extends Document {
  imageURL: string;
  questionText: string;
  extractedText: string;
  aiSolution: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const DoubtSchema: Schema = new Schema<Doubts>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    aiSolution: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model<Doubts>("Doubts", DoubtSchema);

