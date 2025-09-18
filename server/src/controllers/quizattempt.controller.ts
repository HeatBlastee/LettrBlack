import { Request, Response } from "express";
import { QuizModel } from "../models/quiz.model";
import { QuizAttemptModel } from "../models/quizAttempt.model";

export const submitquiz = async (req: Request, res: Response) => {
  try {
    const { quizId, userId, timetaken, ans } = req.body;
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (ans[idx] === q.correctAnswer) score++;
    });

    const attempt = new QuizModel({
      quizId,
      userId,
      score,
      timetaken,
      submittedAt: new Date(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in submitting quiz", error });
  }
};

export const getUserResults = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const attempts = await QuizAttemptModel.find({ userId }).populate("quizId");
    res.json(attempts);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching user results", error });
  }
};
