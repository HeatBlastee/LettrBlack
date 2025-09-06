import { Request, Response } from "express";
import { Group } from "../models/group.model";

class GroupController {
  async createGroup(req: Request, res: Response) {
    try {
      const { name, description, isPrivate, userId } = req.body;
      const group = new Group({
        name,
        description,
        isPrivate,
        createdBy: userId,
        members: [userId],
      });
      await group.save();
      res.status(201).json(group);
    } catch (error) {
      res.status(500).json({ message: "Error in craeting a group", error });
    }
  }

  async joinGroup(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const { userId } = req.body;
      const group = await Group.findById(groupId);

      if (!group) return res.status(404).json({ message: "Group not found" });

      if (!group.members.includes(userId)) {
        group.members.push(userId);
        await group.save();
      }
      res.status(200).json({ message: "Joined group", group });
    } catch (error) {
      res.status(500).json({ message: "Error in joining group" });
    }
  }

  async leaveGroup(req: Request, res: Response) {
    try {
      const { groupId } = req.params;
      const { userId } = req.body;
      const group = await Group.findById(groupId);

      if (!group) return res.status(404).json({ message: "Group not found" });

      group.members = group.members.filter(
        (memberId) => memberId.toString() !== userId
      );

      await group.save();
      res.status(200).json({ message: "Left group", group });
    } catch (error) {
      res.status(500).json({ message: "Error in leaving the group", error });
    }
  }

  async myGroups(req: Request, res: Response) {
    try {
      const { userId } = req.query;
      const groups = await Group.find({ members: userId });
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: "Error in fetching the groups", error });
    }
  }
}
export default new GroupController();
