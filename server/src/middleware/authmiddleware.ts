import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  try {
    const secretKey = 'LettrBlack';
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
