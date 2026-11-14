import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/src/lib/auth";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            omit: { password: true }, // hash password tidak boleh dikirim ke browser
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
            orderBy: { createdAt: "desc" },
        });

        const data = users.map((u) => {
            const kelas = u.siswa?.riwayatKelas[0]?.kelas;

            return {
                id: u.id,
                username: u.username,
                role: u.role,
                status: u.status,
                lastLogin: u.lastLogin,
                createdAt: u.createdAt,
                nama: u.siswa?.nama ?? u.karyawan?.nama ?? null,
                nis: u.siswa?.nis ?? null,
                nip: u.karyawan?.nip ?? null,
                kelas: kelas?.kodeKelas ?? null,
                jurusan: kelas?.jurusan.nama ?? null,
                mapel: u.karyawan?.mapel.map((m) => m.mapel.nama) ?? [],
            };
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("ERROR GET ACCOUNT:", error);

        return NextResponse.json(
            { success: false, message: "Gagal mengambil data account" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { nama, role, password, nip, prodi, nis, kelas, username } = body;

        // ===== Validasi umum =====
        if (!nama || !role || !password) {
            return NextResponse.json(
                { success: false, message: "Nama, role, dan password wajib diisi" },
                { status: 400 }
            );
        }

        if (!["ADMIN", "GURU", "SISWA"].includes(role)) {
            return NextResponse.json(
                { success: false, message: "Role tidak dikenali" },
                { status: 400 }
            );
        }

        
        let loginUsername = "";
        let tahunAjaranId = "";
        let selectedMapelIds: string[] = [];

        if (role === "SISWA") {
            if (!nis || !kelas) {
                return NextResponse.json(
                    { success: false, message: "NIS dan kelas wajib diisi" },
                    { status: 400 }
                );
            }

            const tahunAjaran = await prisma.tahunAjaran.findFirst({
                where: { isActive: true },
            });

            if (!tahunAjaran) {
                return NextResponse.json(
                    { success: false, message: "Belum ada tahun ajaran aktif" },
                    { status: 400 }
                );
            }

            const kelasAda = await prisma.kelas.findUnique({
                where: { id: kelas },
            });

            if (!kelasAda) {
                return NextResponse.json(
                    { success: false, message: "Kelas tidak ditemukan" },
                    { status: 400 }
                );
            }

            loginUsername = String(nis).trim();
            tahunAjaranId = tahunAjaran.id;
        }

        if (role === "GURU") {
            if (!nip) {
                return NextResponse.json(
                    { success: false, message: "NIP wajib diisi" },
                    { status: 400 }
                );
            }

            if (Array.isArray(body.mapelIds)) {
                selectedMapelIds = body.mapelIds
                    .filter((id: unknown): id is string => typeof id === "string")
                    .map((id: string) => id.trim())
                    .filter(Boolean);
            }

            // kompatibilitas lama: dropdown mapel mengirim nama mapel
            if (selectedMapelIds.length === 0 && prodi) {
                const mapel = await prisma.mataPelajaran.findFirst({
                    where: { nama: prodi },
                });

                if (mapel) {
                    selectedMapelIds = [mapel.id];
                }
            }

            selectedMapelIds = [...new Set(selectedMapelIds)];

            if (selectedMapelIds.length === 0) {
                return NextResponse.json(
                    { success: false, message: "Pilih minimal satu mata pelajaran" },
                    { status: 400 }
                );
            }

            const mapelAda = await prisma.mataPelajaran.findMany({
                where: { id: { in: selectedMapelIds } },
                select: { id: true },
            });

            if (mapelAda.length !== selectedMapelIds.length) {
                return NextResponse.json(
                    { success: false, message: "Mata pelajaran tidak ditemukan" },
                    { status: 400 }
                );
            }

            loginUsername = String(nip).trim();
        }

        if (role === "ADMIN") {
            if (!username) {
                return NextResponse.json(
                    { success: false, message: "Username wajib diisi" },
                    { status: 400 }
                );
            }

            loginUsername = String(username).trim();
        }

        const hashedPassword = await hashPassword(password);

        // ===== Buat akun + profil dalam satu operasi (atomik) =====
        const user = await prisma.user.create({
            data: {
                username: loginUsername,
                password: hashedPassword,
                role,

                siswa:
                    role === "SISWA"
                        ? {
                              create: {
                                  nama,
                                  nis: loginUsername,
                                  riwayatKelas: {
                                      create: {
                                          kelasId: kelas,
                                          tahunAjaranId,
                                      },
                                  },
                              },
                          }
                        : undefined,

                karyawan:
                    role === "GURU" || role === "ADMIN"
                        ? {
                              create: {
                                  nama,
                                  nip: role === "GURU" ? loginUsername : null,
                                  jenis: role === "GURU" ? "GURU" : "ADMIN",
                                  mapel:
                                      role === "GURU"
                                          ? {
                                                create: selectedMapelIds.map(
                                                    (mapelId) => ({ mapelId })
                                                ),
                                            }
                                          : undefined,
                              },
                          }
                        : undefined,
            },
            omit: { password: true },
            include: {
                siswa: { include: { riwayatKelas: true } },
                karyawan: { include: { mapel: true } },
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
        // P2002 = melanggar @unique (username / NIS / NIP sudah terdaftar)
        if ((error as { code?: string }).code === "P2002") {
            return NextResponse.json(
                { success: false, message: "NIS/NIP/Username sudah terdaftar" },
                { status: 409 }
            );
        }

        console.error("ERROR POST ACCOUNT:", error);

        return NextResponse.json(
            { success: false, message: "Gagal membuat account" },
            { status: 500 }
        );
    }
}