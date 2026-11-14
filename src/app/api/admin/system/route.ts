import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/src/lib/session";
import {
    checkDatabase,
    collectResources,
    collectServerInfo,
    getSystemSettings,
} from "@/src/lib/system";

export async function GET() {
    try {
        const admin = await getAdminUser();

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Tidak memiliki akses" },
                { status: 401 }
            );
        }

        const [settings, siswa, guru, adminCount, activities, resources, database] =
            await Promise.all([
                getSystemSettings(),
                prisma.siswa.count({ where: { status: "AKTIF" } }),
                prisma.karyawan.count({ where: { jenis: "GURU" } }),
                prisma.user.count({ where: { role: "ADMIN" } }),
                prisma.activityLog.findMany({
                    orderBy: { createdAt: "desc" },
                    take: 10,
                }),
                collectResources(),
                checkDatabase(),
            ]);

        return NextResponse.json({
            success: true,
            data: {
                stats: { siswa, guru, admin: adminCount },
                server: collectServerInfo(),
                resources,
                database,
                settings,
                activities: activities.map((a) => ({
                    id: a.id,
                    eventType: a.eventType,
                    description: a.description,
                    status: a.status,
                    actor: a.actor,
                    createdAt: a.createdAt.toISOString(),
                })),
            },
        });
    } catch (error) {
        console.error("GET /api/admin/system", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data sistem" },
            { status: 500 }
        );
    }
}
