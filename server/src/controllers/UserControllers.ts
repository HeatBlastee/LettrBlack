import { Request, Response } from "express";
import { UserModel } from "../models/User";
import jwt, { JwtPayload } from "jsonwebtoken";


interface AuthRequest extends Request {
  user?: { id: string; email?: string; name?: string } | JwtPayload | string;
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const CurrentuserId = (req.user as any)?.id;

    const UserDetails = await UserModel.findById(CurrentuserId).select(
      "-passwordHash"
    );

    if (!UserDetails) {
      return res
        .status(404)
        .json({ sucess: false, message: "User not found" });
    }

    return res.status(200).json({
      sucess: true,
      message: "User Found successfully",
      data: UserDetails,
    });
  } catch (error: any) {
    res.status(400).json({ sucess: false, message: error.message });
  }
};

export const UserProfile = async (req: Request, res: Response) => {
  try {
    const userid = req.params.id;

    if (!userid) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid Userid" });
    }

    const UserDetails = await UserModel.findById(userid).select("-passwordHash");

    if (!UserDetails) {
      return res
        .status(404)
        .json({ sucess: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ sucess: true, message: "User Found", data: UserDetails });
  } catch (error: any) {
    res.status(400).json({ sucess: false, message: error.message });
  }
};







export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, avatar, bio } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      (req.user as any)?.id,
      {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(bio && { bio }),
      },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedUser) {
      return res
        .status(404)
        .json({ sucess: false, message: "User not found" });
    }


    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });


    const secretKey = "LettrBlack";
    const token = jwt.sign(
      { id: updatedUser._id, email: updatedUser.email, name: updatedUser.name },
      secretKey,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      sucess: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ sucess: false, message: error.message });
  }
};
