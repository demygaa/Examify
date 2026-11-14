import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { getAdminUser } from "@/src/lib/session";
import { writeActivity } from "@/src/lib/system";

const VALID_ACTIONS = ["refresh-cache", "clear-temp", "restart"] as const;
type Action = (typeof VALID_ACTIONS)[number];

function isAction(value: unknown): value is Action {
    return (
        typeof value === "string" &&
        (VALID_ACTIONS as readonly string[]).includes(value)
    );
}

export async function POST(request: Request) {
    try {
        const admin = await getAdminUser();

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Tidak memiliki akses" },
                { status: 401 }
            );
        }

        const body: Record<string, unknown> = await request.json();
        const action = body.action;

        if (!isAction(action)) {
            return NextResponse.json(
                { success: false, message: "Aksi tidak dikenal" },
                { status: 400 }
            );
        }

        const actorName = admin.username;

        if (action === "clear-temp") {
            const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const result = await prisma.activityLog.deleteMany({
                where: { createdAt: { lt: cutoff } },
            });

            await writeActivity({
                eventType: "Pemeliharaan",
                description: `Menghapus ${result.count} log aktivitas lama (lebih dari 30 hari).`,
                actor: actorName,
            });

            return NextResponse.json({
                success: true,
                message: `${result.count} log lama berhasil dihapus`,
                data: { count: result.count },
            });
        }

        revalidatePath("/", "layout");

        if (action === "restart") {
            await writeActivity({
                eventType: "Pemeliharaan",
                description: "Aplikasi dimuat ulang (soft reload).",
                actor: actorName,
            });

            return NextResponse.json({
                success: true,
                message: "Aplikasi berhasil dimuat ulang",
            });
        }

        await writeActivity({
            eventType: "Pemeliharaan",
            description: "Cache aplikasi disegarkan.",
            actor: actorName,
        });

        return NextResponse.json({
            success: true,
            message: "Cache aplikasi berhasil disegarkan",
        });
    } catch (error) {
        console.error("POST /api/admin/system/actions", error);
        return NextResponse.json(
            { success: false, message: "Gagal menjalankan aksi pemeliharaan" },
            { status: 500 }
        );
    }
}
