"use client";

import { useEffect, useState } from "react";

export interface MapelDetail {
    id: string;
    kode: string;
    nama: string;
    isActive: boolean;
    createdAt: string;
    jumlahGuru: number;
}

export interface MapelDetailDrawerProps {
    /** id mapel yang dipilih. null = drawer tertutup. */
    id: string | null;
    /** Dipanggil saat drawer ditutup (X, overlay, atau Esc). */
    onClose: () => void;
}

interface FetchResult {
    id: string | null;
    data: MapelDetail | null;
    error: string | null;
}

export default function MapelDetailDrawer({
    id,
    onClose,
}: MapelDetailDrawerProps) {
    const open = id !== null;

    // Simpan hasil bersama id-nya agar data lama tidak sempat tampil saat
    // pindah mapel dan isi tetap ada selama animasi tutup.
    const [result, setResult] = useState<FetchResult>({
        id: null,
        data: null,
        error: null,
    });

    const current: FetchResult | null = !open
        ? result
        : result.id === id
          ? result
          : null;
    const loading = open && current === null;
    const mapel = current?.data ?? null;
    const error = current?.error ?? null;

    // Ambil data setiap id berubah.
    useEffect(() => {
        if (id === null) return;

        const mapelId = id;
        const controller = new AbortController();

        async function ambilData(): Promise<void> {
            try {
                const res = await fetch(`/api/admin/mapel/${mapelId}`, {
                    signal: controller.signal,
                });
                const json = await res.json();

                if (!res.ok || !json.success) {
                    throw new Error(json.message ?? "Gagal memuat detail mapel");
                }

                setResult({ id: mapelId, data: json.data, error: null });
            } catch (err) {
                const e = err as Error;
                if (e.name === "AbortError") return;
                setResult({ id: mapelId, data: null, error: e.message });
            }
        }

        void ambilData();
        return () => controller.abort();
    }, [id]);

    // Esc untuk menutup + kunci scroll halaman saat terbuka.
    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity duration-300 ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            {/* Panel */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Detail Mapel"
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
                        Detail Mapel
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
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

                    {mapel && (
                        <div className="px-6 py-8">
                            {/* Ringkasan */}
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                                    {mapel.kode}
                                </div>
                                <h3 className="mt-4 text-lg font-bold text-slate-900">
                                    {mapel.nama}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {mapel.kode}
                                </p>
                                <span
                                    className={`mt-3 rounded-full px-3 py-1 text-[11px] font-semibold ${
                                        mapel.isActive
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-indigo-100 text-indigo-700"
                                    }`}
                                >
                                    {mapel.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Info utama */}
                            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-b border-slate-200 pb-6">
                                <Info label="Kode Mapel" value={mapel.kode} />
                                <Info label="Nama Mapel" value={mapel.nama} />
                                <Info
                                    label="Status"
                                    value={mapel.isActive ? "Active" : "Inactive"}
                                />
                                <Info
                                    label="Jumlah Guru"
                                    value={`${mapel.jumlahGuru ?? 0} guru`}
                                />
                                <Info
                                    label="Dibuat"
                                    value={formatTanggal(mapel.createdAt)}
                                />
                            </dl>
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
