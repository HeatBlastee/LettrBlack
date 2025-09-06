import { Request, Response } from "express";
import notesModel from "../models/notes.model";
import mongoose from "mongoose";

export const UploadNotes = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { title, content, fileURL, subject, tags } = req.body;
    const userId = req.userId; // Fetching From Middleware
    const groupId = req.params.groupId;

    if (
      !title ||
      !content ||
      !fileURL ||
      !subject ||
      !tags ||
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !groupId
    ) {
      return res.status(400).json({ message: "Missing Requried Fields" });
    }

    const note = await notesModel.create({
      title,
      content,
      fileURL,
      subject,
      tags,
      upVotes: 0,
      createdBy: new mongoose.Types.ObjectId(userId),
      groupId: new mongoose.Types.ObjectId(groupId),
    });

    if (!note) {
      return res.status(500).json({ message: "Failed to create Notes" });
    }

    return res
      .status(201)
      .json({ message: "Notes Uploaded Successfully", success: true, note });
  } catch (error) {
    res.status(500).json({ message: "Failed to Upload Notes : ", error });
  }
};

export const upVote = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const userId = req.userId; // Fetching From Middleware
    const noteId = req.params.noteId;

    if (!userId || !mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const note = await notesModel.findOne({ _id: noteId });

    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    if (note.upvotedBy.some((id) => id.equals(userId))) {
      return res
        .status(400)
        .json({ message: "You have already upvoted this note" });
    }

    note.upvotedBy.push(new mongoose.Types.ObjectId(userId));
    await note.save();

    return res.status(200).json({
      message: "Note Upvoted Successfully",
      success: true,
      upvoteCount: note.upvotedBy.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to UpVote Notes : ", error });
  }
};

export const getNotes = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const userId = req.userId; // Fetching From Middleware

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "User ID is Required" });
    }

    const allNotes = await notesModel.find();

    if (!allNotes) {
      return res.status(404).json({ message: "Notes Not Found" });
    }

    return res.status(200).json({ message: "Notes Fetched Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Notes : ", error });
  }
};

export const getNoteById = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const userId = req.userId; // Fetching From Middleware
    const noteId = req.params.noteId;

    if (!userId || !mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid Note ID" });
    }

    const note = await notesModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Note fetched Successfully", success: true, note });
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Note By Id : ", error });
  }
};

export const rateNote = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const noteId = req.params.noteId;
    const { value } = req.body;
    const userId = req.userId; // Fetching From Middleware

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid or missing user ID" });
    }

    if (typeof value !== "number" || value < 1 || value > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const note = await notesModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const existRating = note.ratings.find((r) => r.userId.equals(userId));

    if (existRating) {
      existRating.value = value;
    } else {
      note.ratings.push({ userId: new mongoose.Types.ObjectId(userId), value });
    }

    await note.save();

    const total = note.ratings.reduce((sum, r) => sum + r.value, 0);
    const average = total / note.ratings.length;

    return res.status(200).json({
      message: "Rating submitted successfully",
      averageRating: average,
      totalRatings: note.ratings.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to Rate Notes : ", error });
  }
};

export const topRatedNotes = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const userId = req.userId; // Fetching From Middleware
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ message: "Invalid or missing user ID" });
    }

    const topNotes = await notesModel.aggregate([
      {
        $addFields: {
          averageRating: { $avg: "$ratings.value" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.status(200).json({
      message: "Top Rated Notes Fetched Successfully",
      success: true,
      topNotes,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Fetch Top Rated Notes : ", error });
  }
};
