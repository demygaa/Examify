import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/src/lib/auth";

function getErrorCode(error: unknown): string | undefined {
    if (typeof error === "object" && error !== null && "code" in error) {
        const code = (error as { code?: unknown }).code;
        return typeof code === "string" ? code : undefined;
    }

    return undefined;
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const user = await prisma.user.findUnique({
            where: { id },
            omit: { password: true },
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
                        waliKelas: { include: { kelas: true } },
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Akun tidak ditemukan" },
                { status: 404 }
            );
        }

        const kelas = user.siswa?.riwayatKelas[0]?.kelas;

        return NextResponse.json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                status: user.status,
                nama: user.siswa?.nama ?? user.karyawan?.nama ?? "",
                nip: user.karyawan?.nip ?? "",
                nis: user.siswa?.nis ?? "",
                kelasId: kelas?.id ?? "",
                kelasKode: kelas?.kodeKelas ?? "",
                jurusan: kelas?.jurusan.nama ?? "",
                mapel:
                    user.karyawan?.mapel.map((item) => ({
                        id: item.mapel.id,
                        nama: item.mapel.nama,
                    })) ?? [],
                mapelIds:
                    user.karyawan?.mapel.map((item) => item.mapelId) ?? [],
                waliKelas: user.karyawan?.waliKelas
                    ? {
                          kelasId: user.karyawan.waliKelas.kelasId,
                          kodeKelas: user.karyawan.waliKelas.kelas.kodeKelas,
                      }
                    : null,
                createdAt: user.createdAt.toISOString(),
                lastLogin: user.lastLogin?.toISOString() ?? null,
            },
        });
    } catch (error) {
        console.error("GET /api/admin/accounts/[id]", error);
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const { nama, password, nip, mapelIds, kelas } = body;

        if (!nama || typeof nama !== "string" || !nama.trim()) {
            return NextResponse.json(
                { success: false, message: "Nama wajib diisi" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id },
            include: { karyawan: true, siswa: true },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Akun tidak ditemukan" },
                { status: 404 }
            );
        }

        let selectedMapelIds: string[] = [];

        if (user.role === "GURU") {
            if (Array.isArray(mapelIds)) {
                selectedMapelIds = mapelIds
                    .filter((value: unknown): value is string => typeof value === "string")
                    .map((value: string) => value.trim())
                    .filter(Boolean);
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
        }

        const passwordData = password
            ? { password: await hashPassword(String(password)) }
            : {};

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id },
                data: passwordData,
            });

            if (user.role === "GURU" && user.karyawan) {
                await tx.karyawan.update({
                    where: { id: user.karyawan.id },
                    data: {
                        nama: nama.trim(),
                        nip: nip ? String(nip).trim() : null,
                    },
                });

                await tx.guruMapel.deleteMany({
                    where: { karyawanId: user.karyawan.id },
                });

                await tx.guruMapel.createMany({
                    data: selectedMapelIds.map((mapelId) => ({
                        karyawanId: user.karyawan!.id,
                        mapelId,
                    })),
                });
            } else if (user.karyawan) {
                await tx.karyawan.update({
                    where: { id: user.karyawan.id },
                    data: { nama: nama.trim() },
                });
            } else if (user.siswa) {
                await tx.siswa.update({
                    where: { id: user.siswa.id },
                    data: { nama: nama.trim() },
                });

                if (kelas) {
                    const tahunAjaran = await tx.tahunAjaran.findFirst({
                        where: { isActive: true },
                    });

                    if (!tahunAjaran) {
                        throw new Error("Belum ada tahun ajaran aktif");
                    }

                    await tx.siswaKelas.upsert({
                        where: {
                            siswaId_tahunAjaranId: {
                                siswaId: user.siswa.id,
                                tahunAjaranId: tahunAjaran.id,
                            },
                        },
                        update: { kelasId: String(kelas) },
                        create: {
                            siswaId: user.siswa.id,
                            kelasId: String(kelas),
                            tahunAjaranId: tahunAjaran.id,
                        },
                    });
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Akun berhasil diperbarui",
        });
    } catch (error) {
        const code = getErrorCode(error);

        if (code === "P2002") {
            return NextResponse.json(
                { success: false, message: "NIP sudah terdaftar" },
                { status: 409 }
            );
        }

        console.error("PATCH /api/admin/accounts/[id]", error);
        return NextResponse.json(
            { success: false, message: "Gagal memperbarui akun" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        await prisma.user.update({
            where: { id },
            data: { status: "INACTIVE" },
        });

        return NextResponse.json({
            success: true,
            message: "Akun berhasil dinonaktifkan",
        });
    } catch (error) {
        const code = getErrorCode(error);

        if (code === "P2025") {
            return NextResponse.json(
                { success: false, message: "Akun tidak ditemukan" },
                { status: 404 }
            );
        }

        console.error("DELETE /api/admin/accounts/[id]", error);
        return NextResponse.json(
            { success: false, message: "Gagal menonaktifkan akun" },
            { status: 500 }
        );
    }
}
