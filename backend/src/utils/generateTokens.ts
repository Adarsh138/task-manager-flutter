// backend/src/utils/generateTokens.ts
import jwt from 'jsonwebtoken';

// In secrets ko hum .env file se access karenge
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'jaipur_task_manager_access_2026';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'jaipur_task_manager_refresh_2026';

export const generateTokens = (userId: number) => {
  /**
   * Requirement: User Security & Authentication
   * 1. Access Token: Short-lived (15 minutes) secure access ke liye
   * 2. Refresh Token: Long-lived (7 days) session maintain karne ke liye
   */

  const accessToken = jwt.sign(
    { userId },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};