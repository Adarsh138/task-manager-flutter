// src/middlewares/authMiddleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  // Authorization header se token nikalna
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Token verify karna
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'your_secret_key');
    req.userId = (decoded as any).userId; // User ID ko request object mein attach karna
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};