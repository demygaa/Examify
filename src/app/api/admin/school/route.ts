import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import type {
    SchoolCreateInput,
    SchoolUpdateInput,
} from "@/src/generated/prisma/models/School";

function getErrorCode(error: unknown): string | undefined {
    if (typeof error === "object" && error !== null && "code" in error) {
        const code = (error as { code?: unknown }).code;
        return typeof code === "string" ? code : undefined;
    }

    return undefined;
}

type SchoolPatch = {
    name?: string;
    npsn?: string;
    logoUrl?: string | null;
    description?: string | null;
    email?: string | null;
    phone?: string | null;
    website?: string | null;
    address?: string | null;
    city?: string;
    province?: string;
    postalCode?: string | null;
};

function pickSchoolData(body: Record<string, unknown>): SchoolPatch {
    const data: Record<string, string | null> = {};

    const fields: string[] = [
        "name",
        "npsn",
        "logoUrl",
        "description",
        "email",
        "phone",
        "website",
        "address",
        "city",
        "province",
        "postalCode",
    ];

    for (const field of fields) {
        if (!(field in body)) continue;

        const value = body[field];
        data[field] = value === null ? null : String(value);
    }

    return data as unknown as SchoolPatch;
}

export async function GET() {
    try {
        const school = await prisma.school.findUnique({
            where: { id: "main" },
        });

        return NextResponse.json({
            success: true,
            data: school ?? null,
        });
    } catch (error) {
        console.error("GET /api/admin/school", error);
        return NextResponse.json(
            { success: false, message: "Gagal mengambil data sekolah" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body: Record<string, unknown> = await request.json();
        const data = pickSchoolData(body);

        // Kolom wajib di database, maka wajib disertakan setiap kali disimpan.
        if (
            !data.name ||
            !data.npsn ||
            !data.city ||
            !data.province
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Nama sekolah, NPSN, kota, dan provinsi wajib diisi",
                },
                { status: 400 }
            );
        }

        if (!/^\d{8}$/.test(String(data.npsn))) {
            return NextResponse.json(
                { success: false, message: "NPSN harus 8 digit angka" },
                { status: 400 }
            );
        }

        if (
            data.postalCode != null &&
            String(data.postalCode) !== "" &&
            !/^\d{5}$/.test(String(data.postalCode))
        ) {
            return NextResponse.json(
                { success: false, message: "Kode pos harus 5 digit angka" },
                { status: 400 }
            );
        }

        if ("logoUrl" in body) {
            const logoUrl = data.logoUrl?.trim() ?? "";
            const isDataUrl =
                /^data:image\/(png|jpe?g|webp);base64,/i.test(logoUrl);
            const isHttpUrl = /^https?:\/\//i.test(logoUrl);

            if (logoUrl && !isDataUrl && !isHttpUrl) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Format logo tidak valid",
                    },
                    { status: 400 }
                );
            }

            if (logoUrl.length > 3_000_000) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Ukuran logo terlalu besar",
                    },
                    { status: 400 }
                );
            }

            data.logoUrl = logoUrl || null;
        }

        const school = await prisma.school.upsert({
            where: { id: "main" },
            update: data as SchoolUpdateInput,
            create: {
                id: "main",
                name: data.name!,
                npsn: data.npsn!,
                city: data.city!,
                province: data.province!,
                logoUrl: data.logoUrl ?? null,
                description: data.description ?? null,
                email: data.email ?? null,
                phone: data.phone ?? null,
                website: data.website ?? null,
                address: data.address ?? null,
                postalCode: data.postalCode ?? null,
            } as SchoolCreateInput,
        });

        return NextResponse.json({
            success: true,
            message: "Data sekolah berhasil disimpan",
            data: school,
        });
    } catch (error) {
        const code = getErrorCode(error);

        if (code === "P2002") {
            return NextResponse.json(
                { success: false, message: "NPSN sudah terdaftar" },
                { status: 409 }
            );
        }

        console.error("PATCH /api/admin/school", error);
        return NextResponse.json(
            { success: false, message: "Gagal menyimpan data sekolah" },
            { status: 500 }
        );
    }
}
