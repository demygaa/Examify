import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/src/lib/auth";

export async function GET() {
    try {
        const accounts = await prisma.user.findMany({
            include: {
                siswa: {
                    include: {
                        kelas: true,
                    },
                },
                guru: true,
                admin: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: accounts,
        });
    } catch (error) {
        console.error("ERROR GET ACCOUNT:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Gagal mengambil data account",
            },
            { status: 500 }
        );
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            nama,
            role,
            nip,
            prodi,
            nis,
            kelas,
            username,
        } = body;

        const hashedPassword = await hashPassword(body.password);

        const user = await prisma.user.create({
            data: {
                password: hashedPassword,
                role,

                // =====================
                // GURU
                // =====================
                guru:
                    role === "GURU"
                        ? {
                            create: {
                                nama,
                                nip,
                                prodi,
                            },
                        }
                        : undefined,

                // =====================
                // SISWA
                // =====================
                siswa:
                    role === "SISWA"
                        ? {
                            create: {
                                nama,
                                nis,

                                kelas: {
                                    connect: {
                                        id: kelas,
                                    },
                                },
                            },
                        }
                        : undefined,

                // =====================
                // ADMIN
                // =====================
                admin:
                    role === "ADMIN"
                        ? {
                            create: {
                                nama,
                                username,
                            },
                        }
                        : undefined,
            },

            include: {
                siswa: {
                    include: {
                        kelas: true,
                    },
                },
                guru: true,
                admin: true,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Account berhasil dibuat",
                data: user,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("ERROR POST ACCOUNT:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Gagal membuat account",
                error: String(error),
            },
            { status: 500 }
        );
    }
}