import { Request, Response } from "express";
import { QuizModel } from "../models/quiz.model";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = new QuizModel(req.body);
    await quiz.save();
    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ message: "Error in creating Quiz", error });
  }
};

export const getDailyQuiz = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const quiz = await QuizModel.findOne({
      type: "daily",
      createdAt: { $gte: today },
    });
    if (!quiz) return res.status(200).json({ message: "No Daily quiz found" });
    res.json(quiz);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching daily quiz", error });
  }
};

export const getAllQuizes = async (req: Request, res: Response) => {
  try {
    const quizes = await QuizModel.find();
    res.json(quizes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in fetching all quizes", error });
  }
};
