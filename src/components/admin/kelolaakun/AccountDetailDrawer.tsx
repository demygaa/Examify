"use client";

import { useCallback, useEffect, useState } from "react";
import AccountForm from "./AccountForm";

export type AccountRole = "ADMIN" | "GURU" | "SISWA";

export interface AccountDetail {
    id: string;
    username: string;
    role: AccountRole;
    status: string;
    nama: string;
    nip: string;
    nis: string;
    kelasId: string;
    kelasKode: string;
    jurusan: string;
    mapel: { id: string; nama: string }[];
    mapelIds: string[];
    waliKelas: { kelasId: string; kodeKelas: string } | null;
    createdAt: string;
    lastLogin: string | null;
}

type AccountDetailDrawerProps = {
    /** id akun yang dipilih. null = drawer tertutup. */
    id: string | null;
    /** Dipanggil saat drawer ditutup (X, overlay, atau Esc). */
    onClose: () => void;
    /** Dipanggil setelah data akun berubah agar tabel bisa refresh. */
    onChanged?: () => void;
};

interface FetchResult {
    id: string | null;
    data: AccountDetail | null;
    error: string | null;
}

export default function AccountDetailDrawer({
    id,
    onClose,
    onChanged,
}: AccountDetailDrawerProps) {
    const open = id !== null;

    // Simpan hasil bersama id-nya agar data lama tidak sempat tampil saat
    // pindah akun dan isi tetap ada selama animasi tutup.
    const [result, setResult] = useState<FetchResult>({
        id: null,
        data: null,
        error: null,
    });
    const [reloadKey, setReloadKey] = useState(0);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const current: FetchResult | null = !open
        ? result
        : result.id === id
          ? result
          : null;
    const loading = open && current === null;
    const account = current?.data ?? null;
    const error = current?.error ?? null;
    const editing = account !== null && editingId === account.id;

    const close = useCallback(() => {
        setEditingId(null);
        setActionError(null);
        onClose();
    }, [onClose]);

    // Ambil data setiap id berubah atau setelah data diubah.
    useEffect(() => {
        if (id === null) return;

        const accountId = id;
        const controller = new AbortController();

        async function ambilData(): Promise<void> {
            try {
                const res = await fetch(`/api/admin/accounts/${accountId}`, {
                    signal: controller.signal,
                });
                const json = await res.json();

                if (!res.ok || !json.success) {
                    throw new Error(json.message ?? "Gagal memuat detail akun");
                }

                setResult({ id: accountId, data: json.data, error: null });
            } catch (err) {
                const e = err as Error;
                if (e.name === "AbortError") return;
                setResult({ id: accountId, data: null, error: e.message });
            }
        }

        void ambilData();
        return () => controller.abort();
    }, [id, reloadKey]);

    // Esc untuk menutup + kunci scroll halaman saat terbuka.
    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };

        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, close]);

    async function handleDelete() {
        if (!account) return;

        const label = account.nama || account.username;
        const yakin = window.confirm(
            `Nonaktifkan akun "${label}"? Akun tidak akan bisa login setelah dinonaktifkan.`
        );

        if (!yakin) return;

        setDeleting(true);
        setActionError(null);

        try {
            const res = await fetch(`/api/admin/accounts/${account.id}`, {
                method: "DELETE",
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                setActionError(json.message ?? "Gagal menonaktifkan akun");
                return;
            }

            setReloadKey((key) => key + 1);
            onChanged?.();
        } catch {
            setActionError("Terjadi kesalahan jaringan");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={close}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300 ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            {/* Panel */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Detail Akun"
                aria-hidden={!open}
                className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-slate-200 bg-slate-50 shadow-2xl transform transition-[transform,visibility] duration-300 ease-out ${
                    open
                        ? "visible translate-x-0"
                        : "invisible translate-x-full"
                }`}
            >
                {/* Header */}
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                    <h2 className="text-sm font-bold text-slate-900">
                        {editing ? "Edit Akun" : "Detail Akun"}
                    </h2>
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Tutup"
                        className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </header>

                {/* Isi */}
                <div className="flex-1 overflow-y-auto">
                    {loading && <Skeleton />}

                    {error && (
                        <p className="m-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    {account && editing && (
                        <div className="px-6 py-6">
                            <AccountForm
                                embedded
                                initial={{
                                    id: account.id,
                                    nama: account.nama,
                                    role: account.role,
                                    nip: account.nip,
                                    nis: account.nis,
                                    kelasId: account.kelasId,
                                    username: account.username,
                                    mapelIds: account.mapelIds,
                                }}
                                onClose={() => setEditingId(null)}
                                onSuccess={() => {
                                    setReloadKey((key) => key + 1);
                                    setEditingId(null);
                                    onChanged?.();
                                }}
                            />
                        </div>
                    )}

                    {account && !editing && (
                        <div className="px-6 py-8">
                            {/* Ringkasan */}
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                                    {inisial(account.nama || account.username)}
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-slate-900">
                                    {account.nama || "-"}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    @{account.username}
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="rounded-full bg-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700">
                                        {roleLabel(account.role)}
                                    </span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                                            account.status === "ACTIVE"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {account.status === "ACTIVE"
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                            </div>

                            {/* Info utama */}
                            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-b border-slate-200 pb-6">
                                <Info
                                    label="Username"
                                    value={`@${account.username}`}
                                />
                                <Info
                                    label={
                                        account.role === "SISWA"
                                            ? "NIS"
                                            : "NIP"
                                    }
                                    value={
                                        account.role === "SISWA"
                                            ? account.nis
                                            : account.nip
                                    }
                                />
                                {account.role === "SISWA" && (
                                    <>
                                        <Info
                                            label="Kelas"
                                            value={account.kelasKode}
                                        />
                                        <Info
                                            label="Jurusan"
                                            value={account.jurusan}
                                        />
                                    </>
                                )}
                                <Info
                                    label="Dibuat"
                                    value={formatTanggal(account.createdAt)}
                                />
                                <Info
                                    label="Terakhir Login"
                                    value={formatTanggal(account.lastLogin)}
                                />
                            </dl>

                            {/* Mapel & wali kelas untuk guru */}
                            {account.role === "GURU" && (
                                <>
                                    <h4 className="mt-6 text-sm font-bold text-slate-900">
                                        Mata Pelajaran
                                    </h4>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {account.mapel.length > 0 ? (
                                            account.mapel.map((item) => (
                                                <span
                                                    key={item.id}
                                                    className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                                                >
                                                    {item.nama}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500">
                                                Belum ada mata pelajaran
                                            </p>
                                        )}
                                    </div>

                                    <h4 className="mt-6 text-sm font-bold text-slate-900">
                                        Wali Kelas
                                    </h4>
                                    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
                                        <p className="text-sm text-slate-700">
                                            {account.waliKelas
                                                ? `Wali kelas ${account.waliKelas.kodeKelas}`
                                                : "Bukan wali kelas"}
                                        </p>
                                    </div>
                                </>
                            )}

                            {actionError && (
                                <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {actionError}
                                </p>
                            )}

                            {/* Aksi */}
                            <div className="mt-8 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingId(account.id)}
                                    className="flex-1 rounded-md border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                                >
                                    Edit Akun
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={
                                        deleting || account.status !== "ACTIVE"
                                    }
                                    className="flex-1 rounded-md bg-red-100 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {deleting
                                        ? "Memproses..."
                                        : account.status === "ACTIVE"
                                          ? "Hapus Akun"
                                          : "Sudah Nonaktif"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

function Info({ label, value }: { label: string; value?: string | null }) {
    return (
        <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </dt>
            <dd className="mt-1 text-sm text-slate-900">{value || "-"}</dd>
        </div>
    );
}

function Skeleton() {
    return (
        <div className="animate-pulse px-6 py-8">
            <div className="mx-auto h-24 w-24 rounded-full bg-slate-200" />
            <div className="mx-auto mt-4 h-5 w-32 rounded bg-slate-200" />
            <div className="mx-auto mt-2 h-3 w-48 rounded bg-slate-200" />
            <div className="mt-8 grid grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i}>
                        <div className="h-2.5 w-16 rounded bg-slate-200" />
                        <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
                    </div>
                ))}
            </div>
            <div className="mt-8 h-16 rounded-lg bg-slate-200" />
        </div>
    );
}

function roleLabel(role: AccountRole): string {
    if (role === "ADMIN") return "Administrator";
    if (role === "GURU") return "Guru";
    return "Siswa";
}

function formatTanggal(value: string | null): string {
    if (!value) return "-";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

function inisial(nama = ""): string {
    return nama
        .replace(/,.*$/, "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((kata) => kata[0].toUpperCase())
        .join("");
}
