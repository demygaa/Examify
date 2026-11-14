"use client";

import { useRef, useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    Download,
    FileSpreadsheet,
    Loader2,
    Upload,
    X,
} from "lucide-react";

type ImportRole = "SISWA" | "GURU" | "ADMIN";

type PreviewRow = {
    rowNumber: number;
    nama: string;
    identifier: string;
    valid: boolean;
    errors: string[];
};

type PreviewResult = {
    summary: { total: number; valid: number; invalid: number };
    rows: PreviewRow[];
};

type ImportResult = {
    summary: { total: number; imported: number; failed: number };
    errors: { rowNumber: number; message: string }[];
    importedRows: { rowNumber: number; nama: string; identifier: string }[];
};

type Props = {
    onClose: () => void;
    onSuccess?: () => void;
};

const ROLE_INFO: Record<
    ImportRole,
    { label: string; columns: string; hint: string }
> = {
    SISWA: {
        label: "Siswa",
        columns: "nama, nis, kelas, password",
        hint: "Kelas diisi kode kelas, contoh X-RPL-1. NIS menjadi username login.",
    },
    GURU: {
        label: "Guru",
        columns: "nama, nip, mapel, password",
        hint: "Mapel boleh kode atau nama, pisahkan dengan koma. Contoh: MAT, BIN.",
    },
    ADMIN: {
        label: "Admin",
        columns: "nama, username, password",
        hint: "Username dipakai untuk login admin.",
    },
};

const inputClass =
    "px-2 py-1 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-400";

export default function ImportAccountModal({ onClose, onSuccess }: Props) {
    const [role, setRole] = useState<ImportRole>("SISWA");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<PreviewResult | null>(null);
    const [result, setResult] = useState<ImportResult | null>(null);
    const [loading, setLoading] = useState<"preview" | "import" | null>(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    function resetPreview() {
        setPreview(null);
        setResult(null);
        setError("");
    }

    function resetFile() {
        setFile(null);
        resetPreview();

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleRoleChange(nextRole: ImportRole) {
        setRole(nextRole);
        resetFile();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selected = event.target.files?.[0] ?? null;

        resetPreview();

        if (!selected) {
            setFile(null);
            return;
        }

        if (!selected.name.toLowerCase().endsWith(".xlsx")) {
            setError("Format file harus .xlsx");
            setFile(null);
            event.target.value = "";
            return;
        }

        setFile(selected);
    }

    async function submit(mode: "preview" | "import") {
        if (!file) {
            setError("Pilih file Excel terlebih dahulu");
            return;
        }

        setError("");
        setLoading(mode);

        try {
            const form = new FormData();
            form.append("file", file);
            form.append("role", role);
            form.append("mode", mode);

            const response = await fetch("/api/admin/accounts/import", {
                method: "POST",
                body: form,
            });

            const data = await response.json();

            if (response.status === 401) {
                setError("Sesi berakhir. Silakan login ulang.");
                return;
            }

            if (!response.ok || !data.success) {
                setError(data.message ?? "Gagal memproses file import");
                return;
            }

            if (mode === "preview") {
                setPreview({
                    summary: data.summary,
                    rows: data.rows,
                });
                return;
            }

            setResult({
                summary: data.summary,
                errors: data.errors ?? [],
                importedRows: data.importedRows ?? [],
            });
            onSuccess?.();
        } catch {
            setError("Terjadi kesalahan jaringan");
        } finally {
            setLoading(null);
        }
    }

    const validCount = preview?.summary.valid ?? 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white shadow-sm rounded-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto h-fit flex flex-col gap-[20px] p-[27px] border border-slate-300">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-black font-semibold">
                            Import Akun Pengguna
                        </p>
                        <p className="text-sm text-slate-500">
                            Unggah file Excel, cek data, lalu import akun.
                        </p>
                    </div>

                    <button type="button" onClick={onClose}>
                        <X strokeWidth={3} color="blue" />
                    </button>
                </div>

                {!result && (
                    <>
                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">
                                Role Akun
                            </label>

                            <select
                                value={role}
                                onChange={(event) =>
                                    handleRoleChange(
                                        event.target.value as ImportRole
                                    )
                                }
                                className={`${inputClass} w-fit`}
                                disabled={loading !== null}
                            >
                                <option value="SISWA">Siswa</option>
                                <option value="GURU">Guru</option>
                                <option value="ADMIN">Admin</option>
                            </select>

                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-slate-700 flex flex-col gap-1">
                                <p>
                                    <span className="font-semibold">
                                        Kolom wajib:
                                    </span>{" "}
                                    {ROLE_INFO[role].columns}
                                </p>
                                <p className="text-slate-600">
                                    {ROLE_INFO[role].hint}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href={`/api/admin/accounts/import/template?role=${role}`}
                                download
                                className="bg-slate-100 text-slate-700 border border-slate-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-slate-200 transition"
                            >
                                <Download size={18} />
                                Unduh Template {ROLE_INFO[role].label}
                            </a>

                            <span className="text-sm text-slate-500">
                                Template berisi contoh kolom yang benar.
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold">
                                File Excel (.xlsx)
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={handleFileChange}
                                disabled={loading !== null}
                                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-white file:font-semibold hover:file:bg-blue-800"
                            />

                            {file && (
                                <p className="flex items-center gap-2 text-sm text-slate-600">
                                    <FileSpreadsheet size={16} />
                                    {file.name}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {error && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {preview && !result && (
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-slate-300 p-3">
                                <p className="text-xs text-slate-500">Total</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {preview.summary.total}
                                </p>
                            </div>
                            <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                                <p className="text-xs text-green-700">Valid</p>
                                <p className="text-xl font-bold text-green-700">
                                    {preview.summary.valid}
                                </p>
                            </div>
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                                <p className="text-xs text-red-700">Error</p>
                                <p className="text-xl font-bold text-red-700">
                                    {preview.summary.invalid}
                                </p>
                            </div>
                        </div>

                        <div className="max-h-[320px] overflow-auto rounded-xl border border-slate-300">
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-slate-100 text-left text-slate-600">
                                    <tr>
                                        <th className="px-3 py-2">Baris</th>
                                        <th className="px-3 py-2">Nama</th>
                                        <th className="px-3 py-2">
                                            NIS/NIP/Username
                                        </th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">
                                            Keterangan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {preview.rows.map((row) => (
                                        <tr
                                            key={row.rowNumber}
                                            className={
                                                row.valid
                                                    ? "border-t border-slate-200"
                                                    : "border-t border-slate-200 bg-red-50"
                                            }
                                        >
                                            <td className="px-3 py-2">
                                                {row.rowNumber}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.nama || "-"}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.identifier || "-"}
                                            </td>
                                            <td className="px-3 py-2">
                                                {row.valid ? (
                                                    <span className="inline-flex items-center gap-1 text-green-700">
                                                        <CheckCircle2 size={16} />
                                                        Valid
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-red-700">
                                                        <AlertCircle size={16} />
                                                        Error
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-3 py-2 text-slate-600">
                                                {row.errors.length > 0
                                                    ? row.errors.join("; ")
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {result && (
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-slate-300 p-3">
                                <p className="text-xs text-slate-500">Total</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {result.summary.total}
                                </p>
                            </div>
                            <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                                <p className="text-xs text-green-700">
                                    Berhasil
                                </p>
                                <p className="text-xl font-bold text-green-700">
                                    {result.summary.imported}
                                </p>
                            </div>
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                                <p className="text-xs text-red-700">Gagal</p>
                                <p className="text-xl font-bold text-red-700">
                                    {result.summary.failed}
                                </p>
                            </div>
                        </div>

                        {result.importedRows.length > 0 && (
                            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                                <p className="font-semibold">
                                    Akun berhasil diimport
                                </p>
                                <p>
                                    {result.importedRows
                                        .map((row) => row.nama)
                                        .join(", ")}
                                </p>
                            </div>
                        )}

                        {result.errors.length > 0 && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                <p className="font-semibold">
                                    Baris yang gagal
                                </p>
                                <ul className="list-disc pl-5">
                                    {result.errors.map((item) => (
                                        <li key={item.rowNumber}>
                                            Baris {item.rowNumber}:{" "}
                                            {item.message}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    {!result && (
                        <>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-200 transition"
                            >
                                Batal
                            </button>

                            {!preview ? (
                                <button
                                    type="button"
                                    onClick={() => submit("preview")}
                                    disabled={!file || loading !== null}
                                    className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading === "preview" ? (
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Upload size={18} />
                                    )}
                                    Preview
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={resetFile}
                                        disabled={loading !== null}
                                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-200 transition"
                                    >
                                        Kembali
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => submit("import")}
                                        disabled={
                                            validCount === 0 ||
                                            loading !== null
                                        }
                                        className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading === "import" ? (
                                            <Loader2
                                                size={18}
                                                className="animate-spin"
                                            />
                                        ) : (
                                            <Upload size={18} />
                                        )}
                                        Import {validCount} Baris Valid
                                    </button>
                                </>
                            )}
                        </>
                    )}

                    {result && (
                        <>
                            <button
                                type="button"
                                onClick={resetFile}
                                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-200 transition"
                            >
                                Import Lagi
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                            >
                                Selesai
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
