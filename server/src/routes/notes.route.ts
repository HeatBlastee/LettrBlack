import express from "express";
import {
  getNoteById,
  getNotes,
  rateNote,
  topRatedNotes,
  UploadNotes,
  upVote,
} from "../controllers/notes.controller";

const router = express.Router();

// These routes are intended to be protected. Please make sure to add the middleware where required.

router.post("/upload/:groupId", UploadNotes);
router.put("/upVote/:noteId", upVote);
router.get("/getNotes", getNotes);
router.get("/getNoteById/:noteId", getNoteById);
router.post("/rateNote/:noteId", rateNote);
router.get("/trending", topRatedNotes);

export default router;
