import { prisma } from "@/src/lib/prisma";
import { writeActivity } from "@/src/lib/activity";
import { NextResponse } from "next/server";
import {
    verifyPassword,
    Role,
    signToken,
    roleHome,
    TOKEN_NAME,
    TOKEN_MAX_AGE,
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

        if (!["SISWA", "GURU", "ADMIN"].includes(role)) {
            return NextResponse.json(
                { success: false, message: "Role tidak dikenali" },
                { status: 400 }
            );
        }

        // Satu query ke tabel User, profil diambil lewat relasi
        const user = await prisma.user.findUnique({
            where: { username: identifier },
            include: {
                siswa: {
                    include: {
                        riwayatKelas: {
                            where: { tahunAjaran: { isActive: true } },
                            include: {
                                kelas: { include: { jurusan: true } },
                            },
                            take: 1,
                        },
                    },
                },
                karyawan: {
                    include: {
                        mapel: { include: { mapel: true } },
                    },
                },
            },
        });

        // Role tidak cocok dianggap "tidak ditemukan", supaya siswa
        // tidak bisa login lewat tab guru (dan sebaliknya)
        if (!user || user.role !== role) {
            await writeActivity({
                eventType: "Login",
                description: "Login gagal: akun tidak ditemukan",
                status: "FAILED",
                actor: identifier,
            });

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
            await writeActivity({
                eventType: "Login",
                description: "Login gagal: password salah",
                status: "FAILED",
                actor: identifier,
            });

            return NextResponse.json(
                { success: false, message: "Password salah" },
                { status: 401 }
            );
        }

        if (user.status !== "ACTIVE") {
            await writeActivity({
                eventType: "Login",
                description: "Login gagal: akun tidak aktif",
                status: "FAILED",
                actor: identifier,
            });

            return NextResponse.json(
                { success: false, message: "Akun tidak aktif" },
                { status: 403 }
            );
        }

        // Susun profil sesuai role
        let profile: {
            nama: string;
            identifier: string;
            extra?: string;
        } | null = null;

        if (role === "SISWA" && user.siswa) {
            const kelas = user.siswa.riwayatKelas[0]?.kelas;

            profile = {
                nama: user.siswa.nama,
                identifier: user.siswa.nis,
                extra: kelas
                    ? `${kelas.tingkat} ${kelas.jurusan.nama}`
                    : undefined,
            };
        } else if (role === "GURU" && user.karyawan) {
            profile = {
                nama: user.karyawan.nama,
                identifier: user.karyawan.nip ?? user.username,
                extra: user.karyawan.mapel.map((m) => m.mapel.nama).join(", "),
            };
        } else if (role === "ADMIN" && user.karyawan) {
            profile = {
                nama: user.karyawan.nama,
                identifier: user.username,
            };
        }

        if (!profile) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Data profil akun belum lengkap",
                },
                { status: 403 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });

        await writeActivity({
            eventType: "Login",
            description: `Login berhasil sebagai ${user.role}`,
            status: "SUCCESS",
            actor: profile.nama,
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
            maxAge: TOKEN_MAX_AGE,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("ERROR LOGIN:", error);

        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan saat login" },
            { status: 500 }
        );
    }
}