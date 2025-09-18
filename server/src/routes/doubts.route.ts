import express from "express";
import { handleOcrAndAI } from "../controllers/doubts.controller";
import { upload } from "../utils/upload";

const router = express.Router();

router.post("/ocr", handleOcrAndAI);

export default router;
