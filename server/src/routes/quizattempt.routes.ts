import { Router } from "express";
import {
  submitquiz,
  getUserResults,
} from "../controllers/quizattempt.controller";

const router = Router();

router.post("/submit", submitquiz);

router.post("/results", getUserResults);

export default router;
