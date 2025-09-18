
import express from 'express'
import { verifyToken } from '../middleware/authmiddleware'
import { getCurrentUser, updateUser, UserProfile } from '../controllers/UserControllers'

export const UserRoute = express.Router()

UserRoute.get('/me',verifyToken,getCurrentUser)
UserRoute.get('/profile/:id',UserProfile)
UserRoute.put('/update',verifyToken,updateUser)