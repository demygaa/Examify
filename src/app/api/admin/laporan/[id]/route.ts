import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import type { KategoriLaporan, StatusLaporan } from "@/src/generated/prisma/client";

function roleLabel(role: string): string {
    if (role === "ADMIN") return "Admin";
    if (role === "GURU") return "Guru";
    return "Siswa";
}

function kategoriLabel(k: KategoriLaporan): string {
    if (k === "AKUN") return "Akun";
    if (k === "SERVER") return "Server";
    return "Ujian";
}

function serialize(laporan: {
    id: string;
    judul: string;
    isi: string | null;
    kategori: KategoriLaporan;
    status: StatusLaporan;
    createdAt: Date;
    updatedAt: Date;
    user: { username: string; role: string };
}) {
    return {
        id: laporan.id,
        laporan: laporan.judul,
        isi: laporan.isi ?? "",
        kategori: kategoriLabel(laporan.kategori),
        status: laporan.status,
        dikirim: laporan.user.username,
        role: roleLabel(laporan.user.role),
        terkirim: laporan.createdAt.toISOString(),
        createdAt: laporan.createdAt.toISOString(),
        updatedAt: laporan.updatedAt.toISOString(),
    };
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const laporan = await prisma.laporan.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        username: true,
                        role: true,
                    },
                },
            },
        });

        if (!laporan) {
            return NextResponse.json(
                { success: false, message: "Laporan tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: serialize(laporan),
        });
    } catch (error) {
        console.error("GET /api/admin/laporan/[id]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil detail laporan" },
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
        const { status } = body as { status?: string };

        const validStatuses: StatusLaporan[] = ["PENDING", "PROSES", "SELESAI"];

        if (!status || !validStatuses.includes(status as StatusLaporan)) {
            return NextResponse.json(
                { success: false, message: "Status tidak valid" },
                { status: 400 }
            );
        }

        const laporan = await prisma.laporan.update({
            where: { id },
            data: { status: status as StatusLaporan },
            include: {
                user: {
                    select: {
                        username: true,
                        role: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "Status laporan berhasil diubah",
            data: serialize(laporan),
        });
    } catch (error) {
        console.error("PATCH /api/admin/laporan/[id]", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengubah status laporan" },
            { status: 500 }
        );
    }
}
