import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/src/lib/session";
import {
    invalidateSystemSettings,
    writeActivity,
} from "@/src/lib/system";

const VALID_TIMEOUTS = [15, 30, 60, 120];
const VALID_TIMEZONES = ["WIB", "WITA", "WIT"];

export async function PATCH(request: Request) {
    try {
        const admin = await getAdminUser();

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Tidak memiliki akses" },
                { status: 401 }
            );
        }

        const body: Record<string, unknown> = await request.json();

        const systemName =
            typeof body.systemName === "string" ? body.systemName.trim() : "";
        const maintenanceMode = Boolean(body.maintenanceMode);
        const sessionTimeout = Number(body.sessionTimeout);
        const timezone = String(body.timezone ?? "").trim();

        if (!systemName) {
            return NextResponse.json(
                { success: false, message: "Nama sistem wajib diisi" },
                { status: 400 }
            );
        }

        if (!VALID_TIMEOUTS.includes(sessionTimeout)) {
            return NextResponse.json(
                { success: false, message: "Batas waktu sesi tidak valid" },
                { status: 400 }
            );
        }

        if (!VALID_TIMEZONES.includes(timezone)) {
            return NextResponse.json(
                { success: false, message: "Zona waktu tidak valid" },
                { status: 400 }
            );
        }

        const data = {
            systemName,
            maintenanceMode,
            sessionTimeout,
            timezone,
        };

        const settings = await prisma.systemSetting.upsert({
            where: { id: "main" },
            update: data,
            create: { id: "main", ...data },
        });

        invalidateSystemSettings();

        await writeActivity({
            eventType: "Konfigurasi",
            description: `Konfigurasi sistem diperbarui (mode pemeliharaan: ${
                maintenanceMode ? "aktif" : "nonaktif"
            }).`,
            actor: admin.username,
        });

        return NextResponse.json({
            success: true,
            message: "Konfigurasi berhasil disimpan",
            data: settings,
        });
    } catch (error) {
        console.error("PATCH /api/admin/system/settings", error);
        return NextResponse.json(
            { success: false, message: "Gagal menyimpan konfigurasi sistem" },
            { status: 500 }
        );
    }
}
