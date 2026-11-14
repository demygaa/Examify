import { NextResponse } from "next/server";
import { getAdminUser } from "@/src/lib/session";
import { writeActivity } from "@/src/lib/activity";
import {
    ImportError,
    createImportedAccount,
    isImportRole,
    loadImportLookups,
    parseImportFile,
    validateImportRows,
} from "@/src/lib/account-import";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_ROWS = 300;

function getErrorMessage(error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
        const code = (error as { code?: unknown }).code;

        if (code === "P2002") {
            return "NIS/NIP/Username sudah terdaftar";
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return "Gagal menyimpan akun";
}

export async function POST(request: Request) {
    const admin = await getAdminUser();

    if (!admin) {
        return NextResponse.json(
            { success: false, message: "Tidak memiliki akses" },
            { status: 401 }
        );
    }

    try {
        const form = await request.formData();
        const file = form.get("file");
        const role = form.get("role");
        const mode = form.get("mode");

        if (!file || typeof file === "string") {
            return NextResponse.json(
                { success: false, message: "File wajib diunggah" },
                { status: 400 }
            );
        }

        if (!isImportRole(role)) {
            return NextResponse.json(
                { success: false, message: "Role tidak valid" },
                { status: 400 }
            );
        }

        if (mode !== "preview" && mode !== "import") {
            return NextResponse.json(
                { success: false, message: "Mode tidak valid" },
                { status: 400 }
            );
        }

        if (file.size === 0) {
            return NextResponse.json(
                { success: false, message: "File kosong" },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { success: false, message: "Ukuran file maksimal 5 MB" },
                { status: 400 }
            );
        }

        if (!file.name.toLowerCase().endsWith(".xlsx")) {
            return NextResponse.json(
                { success: false, message: "Format file harus .xlsx" },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const rows = await parseImportFile(buffer, role);

        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, message: "File tidak memiliki data" },
                { status: 400 }
            );
        }

        if (rows.length > MAX_ROWS) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Maksimal ${MAX_ROWS} baris per import`,
                },
                { status: 400 }
            );
        }

        const lookups = await loadImportLookups();
        const results = validateImportRows(role, rows, lookups);

        if (mode === "preview") {
            const valid = results.filter((result) => result.valid).length;

            return NextResponse.json({
                success: true,
                summary: {
                    total: results.length,
                    valid,
                    invalid: results.length - valid,
                },
                rows: results.map((result) => ({
                    rowNumber: result.rowNumber,
                    nama: result.nama,
                    identifier: result.identifier,
                    valid: result.valid,
                    errors: result.errors,
                })),
            });
        }

        const errors: { rowNumber: number; message: string }[] = [];
        const importedRows: {
            rowNumber: number;
            nama: string;
            identifier: string;
        }[] = [];

        for (const result of results) {
            if (!result.valid) {
                errors.push({
                    rowNumber: result.rowNumber,
                    message: result.errors.join("; "),
                });
                continue;
            }

            try {
                await createImportedAccount(role, result.raw, lookups);
                importedRows.push({
                    rowNumber: result.rowNumber,
                    nama: result.nama,
                    identifier: result.identifier,
                });
            } catch (error) {
                errors.push({
                    rowNumber: result.rowNumber,
                    message: getErrorMessage(error),
                });
            }
        }

        const imported = importedRows.length;
        const failed = results.length - imported;

        await writeActivity({
            eventType: "ACCOUNT_IMPORT",
            description: `Import akun ${role}: ${imported} berhasil, ${failed} gagal`,
            status: imported > 0 ? "SUCCESS" : "FAILED",
            actor: admin.username,
        });

        return NextResponse.json({
            success: true,
            summary: {
                total: results.length,
                imported,
                failed,
            },
            errors,
            importedRows,
        });
    } catch (error) {
        if (error instanceof ImportError) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        console.error("POST /api/admin/accounts/import", error);

        return NextResponse.json(
            { success: false, message: "Gagal memproses file import" },
            { status: 500 }
        );
    }
}
