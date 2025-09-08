import mongoose from "mongoose"
import { UserModel } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const Signup = async (req, res) => {
    try {

        const { name, email, password, avatar, bio } = req.body;




        if (!name || !email || !password) {
            return res.status(400).json({ sucess: false, message: 'Some values are missing' })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ sucess: false, message: 'User already exists' })
        }


        const hashSalt = 12
        const passwordHash = await bcrypt.hash(password, hashSalt)

        const newUser = await UserModel.create(
            {
                name,
                email,
                passwordHash,
                avatar: avatar || '',
                bio: bio || 'I am using LettrBlack'

            }
        )

        const secretKey = 'LettrBlack'
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, name: newUser.name },
            secretKey,
            { expiresIn: '7d' }
        );


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            sucess: true,
            message: 'User created successfully',

        })


    } catch (error) {

        res.status(400).json({ sucess: false, message: error.message })
    }
}













export const Login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ sucess: false, message: 'Some values are missing' })
        }


        const userExist = await UserModel.findOne({ email })

        if (!userExist) {
            return res.status(400).json({ sucess: false, message: 'User not found' })
        }


        const checkpassword = await bcrypt.compare(password, userExist.passwordHash);

        if (!checkpassword) {
            return res.status(400).json({ sucess: false, message: 'User Not Found' })
        }

        if (checkpassword && userExist) {
             const secretKey = 'LettrBlack'
            const token = jwt.sign(
                { id: userExist._id, email: userExist.email, name: userExist.name },
                secretKey,
                { expiresIn: '7d' }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });



            return res.status(200).json({
                sucess: true,
                message: 'Login successfully',
            })
        }




    } catch (error) {

        res.status(400).json({ sucess: false, message: error.message })

    }
}



export const Logout = (req, res) => {


    res.clearCookie("token",
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }

    )
    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });

    
}