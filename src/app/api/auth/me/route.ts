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
                siswa: {
                    include: {
                        // hanya penempatan kelas di tahun ajaran aktif
                        riwayatKelas: {
                            where: { tahunAjaran: { isActive: true } },
                            include: {
                                kelas: { include: { jurusan: true } },
                                tahunAjaran: true,
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

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        if (user.status !== "ACTIVE") {
            return NextResponse.json(
                { success: false, message: "Akun tidak aktif" },
                { status: 403 }
            );
        }

        const role = user.role as Role;

        let profile: Record<string, unknown> = {};

        if (role === "SISWA" && user.siswa) {
            const penempatan = user.siswa.riwayatKelas[0];
            const kelas = penempatan?.kelas;

            profile = {
                id: user.siswa.id,
                nama: user.siswa.nama,
                nis: user.siswa.nis,
                // null kalau siswa belum punya kelas di tahun ajaran aktif
                kelas: kelas
                    ? {
                          id: kelas.id,
                          kode: kelas.kodeKelas,
                          nama: `${kelas.tingkat} ${kelas.jurusan.nama}`,
                      }
                    : null,
                tahunAjaran: penempatan?.tahunAjaran.nama ?? null,
            };
        } else if (role === "GURU" && user.karyawan) {
            const daftarMapel = user.karyawan.mapel.map((m) => ({
                id: m.mapel.id,
                kode: m.mapel.kode,
                nama: m.mapel.nama,
            }));

            profile = {
                id: user.karyawan.id,
                nama: user.karyawan.nama,
                nip: user.karyawan.nip,
                // gabungan teks, supaya komponen lama yang memakai "prodi" tetap jalan
                prodi: daftarMapel.map((m) => m.nama).join(", "),
                mapel: daftarMapel,
            };
        } else if (role === "ADMIN" && user.karyawan) {
            profile = {
                id: user.karyawan.id,
                nama: user.karyawan.nama,
                username: user.username,
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
            },
            { status: 500 }
        );
    }
}