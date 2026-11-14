import { Workbook } from "exceljs";
import { prisma } from "@/src/lib/prisma";
import { hashPassword } from "@/src/lib/auth";

export type ImportRole = "SISWA" | "GURU" | "ADMIN";

export type RawImportRow = {
    rowNumber: number;
    values: Record<string, string>;
};

export type ImportLookups = {
    tahunAjaranId: string | null;
    kelasByKode: Map<string, string>;
    mapelByKode: Map<string, string>;
    mapelByNama: Map<string, string[]>;
    existingIdentifiers: Set<string>;
};

export type ValidatedImportRow = {
    rowNumber: number;
    nama: string;
    identifier: string;
    valid: boolean;
    errors: string[];
    raw: RawImportRow;
};

export class ImportError extends Error {}

const HEADER_ALIASES: Record<string, string> = {
    nama: "nama",
    name: "nama",
    nama_lengkap: "nama",
    nama_lengkap_pengguna: "nama",
    nis: "nis",
    nomor_induk_siswa: "nis",
    nip: "nip",
    nomor_induk_pegawai: "nip",
    kelas: "kelas",
    kode_kelas: "kelas",
    mapel: "mapel",
    mata_pelajaran: "mapel",
    username: "username",
    user_name: "username",
    nama_pengguna: "username",
    password: "password",
    kata_sandi: "password",
    sandi: "password",
};

export const REQUIRED_HEADERS: Record<ImportRole, string[]> = {
    SISWA: ["nama", "nis", "kelas", "password"],
    GURU: ["nama", "nip", "mapel", "password"],
    ADMIN: ["nama", "username", "password"],
};

const TEMPLATE_SAMPLES: Record<ImportRole, string[]> = {
    SISWA: ["Budi Santoso", "2024002", "X-RPL-1", "rahasia123"],
    GURU: ["Siti Aminah", "19870101", "MAT, BIN", "rahasia123"],
    ADMIN: ["Admin TU", "admin2", "rahasia123"],
};

const HEADER_DESCRIPTIONS: Record<string, string> = {
    nama: "Nama lengkap pengguna",
    nis: "Nomor Induk Siswa, dipakai sebagai username login",
    nip: "Nomor Induk Pegawai, dipakai sebagai username login",
    kelas: "Kode kelas, contoh X-RPL-1",
    mapel: "Kode atau nama mapel, pisahkan dengan koma. Contoh: MAT, BIN",
    username: "Username login admin",
    password: "Password akun",
};

export function isImportRole(value: unknown): value is ImportRole {
    return value === "SISWA" || value === "GURU" || value === "ADMIN";
}

function normalizeHeader(value: string) {
    return value
        .replace(/^\uFEFF/, "")
        .trim()
        .toLowerCase()
        .replace(/[\s-]+/g, "_");
}

function cellText(value: string) {
    return value.trim();
}

function splitMapel(value: string) {
    return value
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export async function parseImportFile(
    buffer: Buffer,
    role: ImportRole
): Promise<RawImportRow[]> {
    const workbook = new Workbook();

    try {
        const arrayBuffer = buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength
        ) as ArrayBuffer;

        await workbook.xlsx.load(arrayBuffer);
    } catch {
        throw new ImportError("File Excel tidak valid atau tidak bisa dibaca");
    }

    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
        throw new ImportError("File Excel tidak memiliki worksheet");
    }

    const lastRow = Math.max(worksheet.actualRowCount, worksheet.rowCount);
    let headerRowNumber = 0;

    for (let rowNumber = 1; rowNumber <= Math.min(lastRow, 10); rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        let hasValue = false;

        row.eachCell({ includeEmpty: false }, (cell) => {
            if (cell.text.trim()) {
                hasValue = true;
            }
        });

        if (hasValue) {
            headerRowNumber = rowNumber;
            break;
        }
    }

    if (!headerRowNumber) {
        throw new ImportError("File Excel tidak memiliki baris header");
    }

    const headerRow = worksheet.getRow(headerRowNumber);
    const columns = new Map<string, number>();

    for (let columnNumber = 1; columnNumber <= worksheet.columnCount; columnNumber++) {
        const header = normalizeHeader(headerRow.getCell(columnNumber).text);

        if (!header) {
            continue;
        }

        const canonical = HEADER_ALIASES[header];

        if (!canonical) {
            continue;
        }

        if (columns.has(canonical)) {
            throw new ImportError(
                `Kolom "${canonical}" muncul lebih dari satu kali`
            );
        }

        columns.set(canonical, columnNumber);
    }

    const missing = REQUIRED_HEADERS[role].filter(
        (header) => !columns.has(header)
    );

    if (missing.length > 0) {
        throw new ImportError(
            `Kolom wajib tidak ditemukan: ${missing.join(", ")}`
        );
    }

    const rows: RawImportRow[] = [];

    for (let rowNumber = headerRowNumber + 1; rowNumber <= lastRow; rowNumber++) {
        const row = worksheet.getRow(rowNumber);
        const values: Record<string, string> = {};
        let hasValue = false;

        columns.forEach((columnNumber, header) => {
            const text = cellText(row.getCell(columnNumber).text);
            values[header] = text;

            if (text) {
                hasValue = true;
            }
        });

        if (!hasValue) {
            continue;
        }

        rows.push({ rowNumber, values });
    }

    return rows;
}

export async function loadImportLookups(): Promise<ImportLookups> {
    const [tahunAjaran, kelas, mapel, users, siswa, karyawan] =
        await Promise.all([
            prisma.tahunAjaran.findFirst({
                where: { isActive: true },
                select: { id: true },
            }),
            prisma.kelas.findMany({
                select: { id: true, kodeKelas: true },
            }),
            prisma.mataPelajaran.findMany({
                select: { id: true, kode: true, nama: true },
            }),
            prisma.user.findMany({ select: { username: true } }),
            prisma.siswa.findMany({ select: { nis: true } }),
            prisma.karyawan.findMany({ select: { nip: true } }),
        ]);

    const kelasByKode = new Map<string, string>();

    kelas.forEach((item) => {
        kelasByKode.set(item.kodeKelas.toUpperCase(), item.id);
    });

    const mapelByKode = new Map<string, string>();
    const mapelByNama = new Map<string, string[]>();

    mapel.forEach((item) => {
        mapelByKode.set(item.kode.toUpperCase(), item.id);

        const key = item.nama.trim().toLowerCase();
        const current = mapelByNama.get(key) ?? [];
        current.push(item.id);
        mapelByNama.set(key, current);
    });

    const existingIdentifiers = new Set<string>();

    users.forEach((item) => {
        existingIdentifiers.add(item.username.trim().toLowerCase());
    });
    siswa.forEach((item) => {
        existingIdentifiers.add(item.nis.trim().toLowerCase());
    });
    karyawan.forEach((item) => {
        if (item.nip) {
            existingIdentifiers.add(item.nip.trim().toLowerCase());
        }
    });

    return {
        tahunAjaranId: tahunAjaran?.id ?? null,
        kelasByKode,
        mapelByKode,
        mapelByNama,
        existingIdentifiers,
    };
}

function resolveMapel(
    token: string,
    lookups: ImportLookups
): { id: string | null; ambiguous: boolean } {
    const byKode = lookups.mapelByKode.get(token.toUpperCase());

    if (byKode) {
        return { id: byKode, ambiguous: false };
    }

    const byNama = lookups.mapelByNama.get(token.toLowerCase());

    if (byNama && byNama.length === 1) {
        return { id: byNama[0], ambiguous: false };
    }

    if (byNama && byNama.length > 1) {
        return { id: null, ambiguous: true };
    }

    return { id: null, ambiguous: false };
}

export function validateImportRows(
    role: ImportRole,
    rows: RawImportRow[],
    lookups: ImportLookups
): ValidatedImportRow[] {
    const seenIdentifiers = new Set<string>();

    return rows.map((row) => {
        const errors: string[] = [];
        const get = (key: string) => row.values[key] ?? "";

        const nama = get("nama");
        const password = get("password");

        if (!nama) {
            errors.push("Nama wajib diisi");
        }

        if (!password) {
            errors.push("Password wajib diisi");
        }

        let identifier = "";

        if (role === "SISWA") {
            identifier = get("nis");

            if (!identifier) {
                errors.push("NIS wajib diisi");
            }

            const kelasKode = get("kelas");

            if (!kelasKode) {
                errors.push("Kelas wajib diisi");
            } else if (!lookups.kelasByKode.has(kelasKode.toUpperCase())) {
                errors.push(`Kelas tidak ditemukan: ${kelasKode}`);
            }

            if (!lookups.tahunAjaranId) {
                errors.push("Belum ada tahun ajaran aktif");
            }
        } else if (role === "GURU") {
            identifier = get("nip");

            if (!identifier) {
                errors.push("NIP wajib diisi");
            }

            const mapelValue = get("mapel");

            if (!mapelValue) {
                errors.push("Mapel wajib diisi");
            } else {
                const tokens = splitMapel(mapelValue);
                const unknown: string[] = [];
                const ambiguous: string[] = [];

                if (tokens.length === 0) {
                    errors.push("Mapel wajib diisi");
                }

                tokens.forEach((token) => {
                    const resolved = resolveMapel(token, lookups);

                    if (resolved.ambiguous) {
                        ambiguous.push(token);
                    } else if (!resolved.id) {
                        unknown.push(token);
                    }
                });

                if (unknown.length > 0) {
                    errors.push(
                        `Mapel tidak ditemukan: ${unknown.join(", ")}`
                    );
                }

                if (ambiguous.length > 0) {
                    errors.push(
                        `Mapel ambigu, gunakan kode mapel: ${ambiguous.join(", ")}`
                    );
                }
            }
        } else {
            identifier = get("username");

            if (!identifier) {
                errors.push("Username wajib diisi");
            }
        }

        if (identifier) {
            const key = identifier.trim().toLowerCase();

            if (lookups.existingIdentifiers.has(key)) {
                errors.push(
                    `NIS/NIP/Username sudah terdaftar: ${identifier}`
                );
            } else if (seenIdentifiers.has(key)) {
                errors.push(`Duplikat dalam file: ${identifier}`);
            } else {
                seenIdentifiers.add(key);
            }
        }

        return {
            rowNumber: row.rowNumber,
            nama,
            identifier,
            valid: errors.length === 0,
            errors,
            raw: row,
        };
    });
}

export async function createImportedAccount(
    role: ImportRole,
    row: RawImportRow,
    lookups: ImportLookups
) {
    const get = (key: string) => row.values[key] ?? "";
    const nama = get("nama");
    const hashedPassword = await hashPassword(get("password"));

    if (role === "SISWA") {
        const nis = get("nis");
        const kelasId = lookups.kelasByKode.get(get("kelas").toUpperCase());

        if (!kelasId || !lookups.tahunAjaranId) {
            throw new ImportError("Data kelas atau tahun ajaran tidak valid");
        }

        return prisma.user.create({
            data: {
                username: nis,
                password: hashedPassword,
                role: "SISWA",
                siswa: {
                    create: {
                        nama,
                        nis,
                        riwayatKelas: {
                            create: {
                                kelasId,
                                tahunAjaranId: lookups.tahunAjaranId,
                            },
                        },
                    },
                },
            },
            omit: { password: true },
        });
    }

    if (role === "GURU") {
        const nip = get("nip");
        const mapelIds = [
            ...new Set(
                splitMapel(get("mapel"))
                    .map((token) => resolveMapel(token, lookups).id)
                    .filter((id): id is string => Boolean(id))
            ),
        ];

        if (mapelIds.length === 0) {
            throw new ImportError("Mata pelajaran tidak valid");
        }

        return prisma.user.create({
            data: {
                username: nip,
                password: hashedPassword,
                role: "GURU",
                karyawan: {
                    create: {
                        nama,
                        nip,
                        jenis: "GURU",
                        mapel: {
                            create: mapelIds.map((mapelId) => ({ mapelId })),
                        },
                    },
                },
            },
            omit: { password: true },
        });
    }

    const username = get("username");

    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            role: "ADMIN",
            karyawan: {
                create: {
                    nama,
                    nip: null,
                    jenis: "ADMIN",
                },
            },
        },
        omit: { password: true },
    });
}

export async function buildImportTemplate(role: ImportRole): Promise<Buffer> {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet("Data");
    const headers = REQUIRED_HEADERS[role];

    sheet.addRow(headers);

    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: "middle" };
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFDBEAFE" },
        };
        cell.border = {
            bottom: { style: "thin", color: { argb: "FF94A3B8" } },
        };
    });

    headers.forEach((_, index) => {
        const column = sheet.getColumn(index + 1);
        column.width = 24;
        column.numFmt = "@";
    });

    const samples = TEMPLATE_SAMPLES[role];

    const guide = workbook.addWorksheet("Petunjuk");

    guide.columns = [
        { header: "Kolom", key: "kolom", width: 18 },
        { header: "Wajib", key: "wajib", width: 10 },
        { header: "Keterangan", key: "keterangan", width: 60 },
        { header: "Contoh", key: "contoh", width: 28 },
    ];
    guide.getRow(1).font = { bold: true };

    headers.forEach((header, index) => {
        guide.addRow([
            header,
            "Ya",
            HEADER_DESCRIPTIONS[header] ?? "",
            samples[index] ?? "",
        ]);
    });

    guide.addRow([]);
    guide.addRow([
        "Catatan",
        "",
        "Isi data mulai baris kedua pada sheet Data. Jangan mengubah baris header.",
    ]);

    const arrayBuffer = await workbook.xlsx.writeBuffer();

    return Buffer.from(arrayBuffer);
}
