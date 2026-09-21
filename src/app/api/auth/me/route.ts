import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, TOKEN_NAME, roleHome, Role } from "@/src/lib/auth";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(TOKEN_NAME)?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Tidak terautentikasi" },
                { status: 401 }
            );
        }

        let payload;
        try {
            payload = verifyToken(token);
        } catch {
            return NextResponse.json(
                { success: false, message: "Sesi tidak valid" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            include: {
                siswa: { include: { kelas: true } },
                guru: true,
                admin: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        const role = user.role as Role;

        let profile: Record<string, unknown> = {};
        if (user.siswa) {
            profile = {
                id: user.siswa.id,
                nama: user.siswa.nama,
                nis: user.siswa.nis,
                kelas: {
                    id: user.siswa.kelas.id,
                    nama: `${user.siswa.kelas.kelas} ${user.siswa.kelas.jurusan}`,
                },
            };
        } else if (user.guru) {
            profile = {
                id: user.guru.id,
                nama: user.guru.nama,
                nip: user.guru.nip,
                prodi: user.guru.prodi,
            };
        } else if (user.admin) {
            profile = {
                id: user.admin.id,
                nama: user.admin.nama,
                username: user.admin.username,
            };
        }

        return NextResponse.json({
            success: true,
            data: {
                userId: user.id,
                role: user.role,
                lastLogin: user.lastLogin,
                profile,
                redirectTo: roleHome[role],
            },
        });
    } catch (error) {
        console.error("ERROR ME:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan saat mengambil data user",
                error: String(error),
            },
            { status: 500 }
        );
    }
}   