import * as jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
export interface JwtPayload {
  id: string;
  username: string;
}

/**
 * Generate a JWT token
 * For simplicity, we are not setting any expiration time
 *
 * @param payload - Data to encode in the token
 * @returns Signed JWT token
 */
export function generateToken(payload: JwtPayload): string {
  if (!SECRET_KEY) {
    throw new Error("JWT secret key is not defined");
  }
  return jwt.sign(payload, SECRET_KEY);
}

/**
 * Verify a JWT token
 * @param token - Token to verify
 * @returns Decoded payload if valid
 */
export function verifyToken(token: string): jwt.JwtPayload {
  if (!SECRET_KEY) {
    throw new Error("JWT secret key is not defined");
  }
  const decoded = jwt.verify(token, SECRET_KEY);

  if (typeof decoded === "object" && "id" in decoded && "username" in decoded) {
    return decoded as JwtPayload;
  }

  throw new Error("Invalid token payload");
}
