"use client";

import { useCallback, useEffect, useState } from "react";

export type LaporanStatus = "PENDING" | "PROSES" | "SELESAI";

export interface LaporanDetail {
    id: string;
    laporan: string;
    isi: string;
    kategori: string;
    status: LaporanStatus;
    dikirim: string;
    role: string;
    terkirim: string;
    createdAt: string;
    updatedAt: string;
}

export interface LaporanDetailDrawerProps {
    /** id laporan yang dipilih. null = drawer tertutup. */
    id: string | null;
    /** Dipanggil saat drawer ditutup (X, overlay, atau Esc). */
    onClose: () => void;
    /** Dipanggil setelah status laporan berubah agar tabel bisa refresh. */
    onChanged?: () => void;
}

interface FetchResult {
    id: string | null;
    data: LaporanDetail | null;
    error: string | null;
}

export default function LaporanDetailDrawer({
    id,
    onClose,
    onChanged,
}: LaporanDetailDrawerProps) {
    const open = id !== null;

    // Simpan hasil bersama id-nya agar data lama tidak sempat tampil saat
    // pindah laporan dan isi tetap ada selama animasi tutup.
    const [result, setResult] = useState<FetchResult>({
        id: null,
        data: null,
        error: null,
    });
    const [reloadKey, setReloadKey] = useState(0);
    const [changing, setChanging] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const current: FetchResult | null = !open
        ? result
        : result.id === id
          ? result
          : null;
    const loading = open && current === null;
    const laporan = current?.data ?? null;
    const error = current?.error ?? null;

    const close = useCallback(() => {
        setActionError(null);
        onClose();
    }, [onClose]);

    // Ambil data setiap id berubah atau setelah data diubah.
    useEffect(() => {
        if (id === null) return;

        const laporanId = id;
        const controller = new AbortController();

        async function ambilData(): Promise<void> {
            try {
                const res = await fetch(
                    `/api/admin/laporan/${laporanId}`,
                    { signal: controller.signal }
                );
                const json = await res.json();

                if (!res.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Gagal memuat detail laporan"
                    );
                }

                setResult({ id: laporanId, data: json.data, error: null });
            } catch (err) {
                const e = err as Error;
                if (e.name === "AbortError") return;
                setResult({ id: laporanId, data: null, error: e.message });
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

    const statusLabel = (s: LaporanStatus): string => {
        if (s === "PENDING") return "Pending";
        if (s === "PROSES") return "Proses";
        return "Selesai";
    };

    const statusColor = (s: LaporanStatus): string => {
        if (s === "PENDING") return "bg-orange-100 text-orange-700";
        if (s === "PROSES") return "bg-blue-100 text-blue-700";
        return "bg-emerald-100 text-emerald-700";
    };

    async function handleChangeStatus(nextStatus: LaporanStatus) {
        if (!laporan) return;

        setChanging(true);
        setActionError(null);

        try {
            const res = await fetch(`/api/admin/laporan/${laporan.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                setActionError(json.message ?? "Gagal mengubah status");
                return;
            }

            setReloadKey((key) => key + 1);
            onChanged?.();
        } catch {
            setActionError("Terjadi kesalahan jaringan");
        } finally {
            setChanging(false);
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
                aria-label="Detail Laporan"
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
                        Detail Laporan
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

                    {laporan && (
                        <div className="px-6 py-8">
                            {/* Ringkasan */}
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                                    {laporan.kategori}
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-slate-900">
                                    {laporan.laporan}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Dikirim oleh: {laporan.dikirim}
                                </p>
                                <span
                                    className={`mt-3 rounded-full px-3 py-1 text-[11px] font-semibold ${
                                        statusColor(laporan.status)
                                    }`}
                                >
                                    {statusLabel(laporan.status)}
                                </span>
                            </div>

                            {/* Info utama */}
                            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-b border-slate-200 pb-6">
                                <Info label="Judul Laporan" value={laporan.laporan} />
                                <Info label="Kategori" value={laporan.kategori} />
                                <Info
                                    label="Status"
                                    value={statusLabel(laporan.status)}
                                />
                                <Info
                                    label="Dikirim Oleh"
                                    value={laporan.dikirim}
                                />
                                <Info
                                    label="Role Pengirim"
                                    value={laporan.role}
                                />
                                <Info
                                    label="Tanggal Kirim"
                                    value={formatTanggal(laporan.createdAt)}
                                />
                                <Info
                                    label="Diubah Terakhir"
                                    value={formatTanggal(laporan.updatedAt)}
                                />
                            </dl>

                            {/* Isi Laporan */}
                            <div className="mt-6">
                                <h4 className="text-sm font-bold text-slate-900">
                                    Isi Laporan
                                </h4>
                                <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 whitespace-pre-wrap">
                                    {laporan.isi || "-"}
                                </div>
                            </div>

                            {/* Ubah Status */}
                            <div className="mt-6">
                                <h4 className="text-sm font-bold text-slate-900">
                                    Ubah Status
                                </h4>
                                <div className="mt-3 flex flex-col gap-2">
                                    {(["PENDING", "PROSES", "SELESAI"] as LaporanStatus[]).map(
                                        (s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() =>
                                                    handleChangeStatus(s)
                                                }
                                                disabled={
                                                    changing ||
                                                    laporan.status === s
                                                }
                                                className={`w-full rounded-md border px-3 py-2 text-xs font-semibold text-left transition-colors ${
                                                    laporan.status === s
                                                        ? "border-slate-200 bg-slate-100 text-slate-500"
                                                        : `border-slate-300 bg-white text-slate-700 hover:bg-slate-50 ${
                                                              statusColor(s).includes("bg-")
                                                          }`
                                                }`}
                                            >
                                                {statusLabel(s)}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {actionError && (
                                <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {actionError}
                                </p>
                            )}
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
                {[...Array(5)].map((_, i) => (
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

function formatTanggal(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}
