import { Schema, model, Document, Types } from "mongoose";
import { ref } from "process";
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}
export interface QuizDocument extends Document {
  title: string;
  questions: Question[];
  type: "daily" | "weekly" | "mock";
  leaderboard: Types.ObjectId[];
  createdAt: Date;
}
const QuestionSchema = new Schema<Question>(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const QuizSchema = new Schema<QuizDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
  },
  type: {
    type: String,
    enum: ["daily", "week", "mock"],
    required: true,
  },
  leaderboard: [
    {
      type: Schema.Types.ObjectId,
      ref: "Leaderboard",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{timestamps:true});


export const QuizModel = model<QuizDocument>("Quiz", QuizSchema);

