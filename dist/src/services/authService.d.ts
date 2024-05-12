/**
 * Generate a JWT token for the given mobile number
 * @param mobileNumber
 * @returns JWT token
 */
export declare const generateToken: (mobileNumber: string) => string;
/**
 * Verify the given token
 * @param token
 * @returns true if the token is valid, false otherwise
 */
export declare const verifyToken: (token: string) => boolean;
