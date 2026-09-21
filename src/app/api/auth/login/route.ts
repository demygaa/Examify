import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import {
    verifyPassword,
    Role,
    signToken,
    roleHome,
    TOKEN_NAME,
} from "@/src/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { identifier, password, role } = body as {
            identifier: string;
            password: string;
            role: Role;
        };

        if (!identifier || !password || !role) {
            return NextResponse.json(
                {
                    success: false,
                    message: "NIS/NIP/Username, password, dan role wajib diisi",
                },
                { status: 400 }
            );
        }

        let user = null;
        let profile: {
            nama: string;
            identifier: string;
            extra?: string;
        } | null = null;

        if (role === "SISWA") {
            const siswa = await prisma.siswa.findUnique({
                where: { nis: identifier },
                include: {
                    user: true,
                    kelas: true,
                },
            });

            if (siswa) {
                user = siswa.user;
                profile = {
                    nama: siswa.nama,
                    identifier: siswa.nis,
                    extra: `${siswa.kelas.kelas} ${siswa.kelas.jurusan}`,
                };
            }
        } else if (role === "GURU") {
            const guru = await prisma.guru.findUnique({
                where: { nip: identifier },
                include: { user: true },
            });

            if (guru) {
                user = guru.user;
                profile = {
                    nama: guru.nama,
                    identifier: guru.nip,
                    extra: guru.prodi,
                };
            }
        } else if (role === "ADMIN") {
            const admin = await prisma.admin.findUnique({
                where: { username: identifier },
                include: { user: true },
            });

            if (admin) {
                user = admin.user;
                profile = {
                    nama: admin.nama,
                    identifier: admin.username,
                };
            }
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Role tidak dikenali",
                },
                { status: 400 }
            );
        }

        if (!user || !profile) {
            return NextResponse.json(
                {
                    success: false,
                    message: "NIS/NIP/Username tidak ditemukan",
                },
                { status: 401 }
            );
        }

        const passwordValid = await verifyPassword(password, user.password);

        if (!passwordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password salah",
                },
                { status: 401 }
            );
        }

        if (user.role !== role || user.status !== "ACTIVE") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Akun tidak aktif atau role tidak sesuai",
                },
                { status: 403 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });

        const token = signToken({ userId: user.id, role: user.role });

        const response = NextResponse.json({
            success: true,
            message: "Login berhasil",
            data: {
                userId: user.id,
                role: user.role,
                nama: profile.nama,
                identifier: profile.identifier,
                extra: profile.extra,
                redirectTo: roleHome[user.role],
            },
        });

        response.cookies.set(TOKEN_NAME, token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("ERROR LOGIN:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Terjadi kesalahan saat login",
                error: String(error),
            },
            { status: 500 }
        );
    }
}