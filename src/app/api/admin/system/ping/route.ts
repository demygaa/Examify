import { NextResponse } from "next/server";
import { getAdminUser } from "@/src/lib/session";
import { checkDatabase, writeActivity } from "@/src/lib/system";

export async function POST() {
    try {
        const admin = await getAdminUser();

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Tidak memiliki akses" },
                { status: 401 }
            );
        }

        const database = await checkDatabase();

        await writeActivity({
            eventType: "Pemeriksaan Kesehatan",
            description: database.connected
                ? `Tes koneksi database berhasil (${database.responseMs}ms).`
                : "Tes koneksi database gagal.",
            status: database.connected ? "SUCCESS" : "FAILED",
            actor: admin.username,
        });

        return NextResponse.json(
            {
                success: database.connected,
                message: database.connected
                    ? "Koneksi database berhasil"
                    : "Koneksi database gagal",
                data: database,
            },
            { status: database.connected ? 200 : 503 }
        );
    } catch (error) {
        console.error("POST /api/admin/system/ping", error);
        return NextResponse.json(
            { success: false, message: "Gagal menguji koneksi database" },
            { status: 500 }
        );
    }
}
