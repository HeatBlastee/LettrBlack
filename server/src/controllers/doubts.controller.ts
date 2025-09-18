import { Request, Response } from "express";
import { extractTextFromImage } from "../services/ocr.service";
import { askAI } from "../services/ai.service";
import doubtModel from "../models/doubt.model";

export const handleOcrAndAI = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const image = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    if (!image) {
      console.log(" No image uploaded");
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log(" Received image:", image.path);

    const extractedText = await extractTextFromImage(image.path);
    console.log(" Extracted text:", extractedText);

    if (!extractedText || extractedText.trim() === "") {
      return res.status(400).json({ error: "No text found in image" });
    }

    const aiAnswer = await askAI(extractedText);
    console.log(" AI Answer:", aiAnswer);

    const doubt = await doubtModel.create({
      createdBy: userId,
      imageURL: image,
      questionText: extractedText,
      aiSolution: aiAnswer,
    });

    return res.status(200).json({
      success: true,
      doubt
    });
  } catch (error) {
    console.error(" OCR + AI error:", error);
    return res
      .status(500)
      .json({ error: "Failed to process image and get answer" });
  }
};
