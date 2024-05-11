/**
 * Validate email
 * @param mobileNumber
 * @returns true if the mobile number is valid, false otherwise
 */
export const validateMobileNumber = (mobileNumber) => /^[0]\d{9}$/.test(mobileNumber);
/**
 * Validate password
 * @param password
 * @returns true if the password is valid, false otherwise
 */
export const validatePassword = (password) => password.length >= 6 && /[A-Z]/.test(password);
