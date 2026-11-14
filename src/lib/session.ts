import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import { verifyToken, TOKEN_NAME, type Role } from "@/src/lib/auth";

export type SessionUser = {
    userId: string;
    username: string;
    role: Role;
};

/**
 * Ambil user dari cookie token. Mengembalikan null jika tidak ada token,
 * token tidak valid, atau user sudah tidak ada.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(TOKEN_NAME)?.value;

        if (!token) {
            return null;
        }

        const payload = verifyToken(token);

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, username: true, role: true },
        });

        if (!user) {
            return null;
        }

        return {
            userId: user.id,
            username: user.username,
            role: user.role as Role,
        };
    } catch {
        return null;
    }
}

/** Ambil user hanya jika role-nya ADMIN. */
export async function getAdminUser(): Promise<SessionUser | null> {
    const user = await getCurrentUser();
    return user && user.role === "ADMIN" ? user : null;
}
