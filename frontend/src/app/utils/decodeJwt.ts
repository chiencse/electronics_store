import jwt from 'jsonwebtoken';

// Decode JWT Token (No signature verification)
export const decodeJWT = (token: string | any) => {
    try {
        const decoded = jwt.decode(token);
        return decoded; // Decoded JWT payload
    } catch (error) {
        console.error("Failed to decode JWT", error);
        return null;
    }
};