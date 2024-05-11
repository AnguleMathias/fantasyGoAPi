import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

/**
 * Generate a JWT token for the given mobile number
 * @param mobileNumber
 * @returns JWT token
 */
export const generateToken = (mobileNumber: string): string =>
  jwt.sign({ mobileNumber }, JWT_SECRET, { expiresIn: "1h" });

/**
 * Verify the given token
 * @param token
 * @returns true if the token is valid, false otherwise
 */
export const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};
