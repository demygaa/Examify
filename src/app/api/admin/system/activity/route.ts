import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/src/lib/session";

export async function GET(request: Request) {
    try {
        const admin = await getAdminUser();

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Tidak memiliki akses" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = Math.max(
            1,
            parseInt(searchParams.get("page") ?? "1", 10) || 1
        );
        const pageSize = Math.min(
            50,
            Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10) || 20)
        );

        const [logs, total] = await Promise.all([
            prisma.activityLog.findMany({
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prisma.activityLog.count(),
        ]);

        return NextResponse.json({
            success: true,
            data: logs.map((a) => ({
                id: a.id,
                eventType: a.eventType,
                description: a.description,
                status: a.status,
                actor: a.actor,
                createdAt: a.createdAt.toISOString(),
            })),
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error) {
        console.error("GET /api/admin/system/activity", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil log aktivitas" },
            { status: 500 }
        );
    }
}
