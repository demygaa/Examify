import { hash, compare } from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "examify-super-secret-key-change-me-in-production";
const TOKEN_NAME = "examify_token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; 

export type Role = "ADMIN" | "GURU" | "SISWA";

export const roleHome: Record<Role, string> = {
    ADMIN: "/admin",
    GURU: "/guru",
    SISWA: "/siswa",
};

export function hashPassword(password: string) {
    return hash(password, 10);
}

export async function verifyPassword(password: string, stored: string) {
    
    if (!stored.startsWith("$2")) {
        return password === stored;
    }

    return compare(password, stored);
}

export function signToken(payload: { userId: string; role: Role }) {
    const options: SignOptions = { expiresIn: TOKEN_MAX_AGE };
    return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: Role };
}

export { TOKEN_NAME, TOKEN_MAX_AGE };