import { Router } from "express";
import groupController from "../controllers/group.controller";

const router = Router();

router.post("/groups/create", groupController.createGroup);
router.post("/groupId/join", groupController.joinGroup);
router.post("/groupId/leave", groupController.leaveGroup);
router.get("/groups/my", groupController.myGroups);

export default router;
