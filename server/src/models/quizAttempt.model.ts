import { Schema, model, Document, Types } from "mongoose";
export interface QuizAttemptDocument extends Document {
  quizId: Types.ObjectId;
  userId: Types.ObjectId;
  score: number;
  timetaken: number;
  submittedAt: Date;
}
const QuizAttemptSchema = new Schema<QuizAttemptDocument>(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    timetaken: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export const QuizAttemptModel = model<QuizAttemptDocument>(
  "QuizAttempt",
  QuizAttemptSchema
);
