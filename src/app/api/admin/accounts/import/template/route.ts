import { NextResponse } from "next/server";
import { getAdminUser } from "@/src/lib/session";
import { buildImportTemplate, isImportRole } from "@/src/lib/account-import";

export const runtime = "nodejs";

export async function GET(request: Request) {
    const admin = await getAdminUser();

    if (!admin) {
        return NextResponse.json(
            { success: false, message: "Tidak memiliki akses" },
            { status: 401 }
        );
    }

    const role = new URL(request.url).searchParams.get("role");

    if (!isImportRole(role)) {
        return NextResponse.json(
            { success: false, message: "Role tidak valid" },
            { status: 400 }
        );
    }

    const buffer = await buildImportTemplate(role);

    return new NextResponse(new Uint8Array(buffer), {
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="template-import-${role.toLowerCase()}.xlsx"`,
            "Cache-Control": "no-store",
        },
    });
}
