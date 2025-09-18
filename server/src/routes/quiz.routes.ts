import { Router } from "express";
import { createQuiz, getDailyQuiz,getAllQuizes } from "../controllers/quiz.controller";

const router = Router();

router.post("/create", createQuiz);

router.get("/daily", getDailyQuiz);

router.get("/all", getAllQuizes);

export default router;
