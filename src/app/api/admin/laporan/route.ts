import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import type { LaporanWhereInput } from "@/src/generated/prisma/models/Laporan";
import type { KategoriLaporan, StatusLaporan } from "@/src/generated/prisma/client";

function roleLabel(role: string): string {
    if (role === "ADMIN") return "Admin";
    if (role === "GURU") return "Guru";
    return "Siswa";
}

function statusLabel(s: StatusLaporan): string {
    if (s === "PENDING") return "Pending";
    if (s === "PROSES") return "Proses";
    return "Selesai";
}

function kategoriLabel(k: KategoriLaporan): string {
    if (k === "AKUN") return "Akun";
    if (k === "SERVER") return "Server";
    return "Ujian";
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") ?? "1", 10);
        const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);
        const search = (searchParams.get("search") ?? "").trim();
        const status = (searchParams.get("status") ?? "all").trim();

        const where: LaporanWhereInput = {};

        if (search) {
            where.OR = [
                { judul: { contains: search } },
                { isi: { contains: search } },
                { user: { username: { contains: search } } },
            ];
        }

        if (status && status !== "all") {
            where.status = status as StatusLaporan;
        }

        const [laporans, total] = await Promise.all([
            prisma.laporan.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            role: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prisma.laporan.count({ where }),
        ]);

        const data = laporans.map((l) => ({
            id: l.id,
            laporan: l.judul,
            isi: l.isi ?? "",
            kategori: kategoriLabel(l.kategori),
            status: statusLabel(l.status),
            dikirim: l.user.username,
            role: roleLabel(l.user.role),
            terkirim: l.createdAt.toISOString(),
            createdAt: l.createdAt.toISOString(),
            updatedAt: l.updatedAt.toISOString(),
        }));

        return NextResponse.json({
            success: true,
            data,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error) {
        console.error("GET /api/admin/laporan", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data laporan" },
            { status: 500 }
        );
    }
}
