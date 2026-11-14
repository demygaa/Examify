"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { formatInTimezone } from "@/src/lib/format";
import type { ActivityItem } from "@/src/components/admin/system/types";

type Props = {
    open: boolean;
    onClose: () => void;
    timezone: string;
};

const PAGE_SIZE = 15;

export default function ActivityLogDrawer({
    open,
    onClose,
    timezone,
}: Props) {
    const [logs, setLogs] = useState<ActivityItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;

        let cancelled = false;

        async function fetchLogs() {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(
                    `/api/admin/system/activity?page=${page}&pageSize=${PAGE_SIZE}`,
                    { cache: "no-store" }
                );
                const json = await res.json();

                if (cancelled) return;

                if (!res.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Gagal mengambil log aktivitas"
                    );
                }

                setLogs(json.data);
                setTotalPages(json.totalPages ?? 1);
                setTotal(json.total ?? 0);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Terjadi kesalahan jaringan"
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void fetchLogs();

        return () => {
            cancelled = true;
        };
    }, [open, page]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <button
                type="button"
                aria-label="Tutup"
                onClick={onClose}
                className="absolute inset-0 bg-black/40"
            />

            <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-300 px-5 py-4">
                    <div>
                        <p className="text-[18px] font-semibold text-black">
                            Log Aktivitas
                        </p>
                        <p className="text-[12px] text-slate-600">
                            Total {total} aktivitas
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {loading && (
                        <p className="py-6 text-center text-sm text-slate-500">
                            Memuat log...
                        </p>
                    )}

                    {!loading && error && (
                        <p className="py-6 text-center text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && logs.length === 0 && (
                        <p className="py-6 text-center text-sm text-slate-500">
                            Belum ada aktivitas.
                        </p>
                    )}

                    {!loading && !error && logs.length > 0 && (
                        <ul className="flex flex-col divide-y divide-slate-200">
                            {logs.map((log) => (
                                <li key={log.id} className="py-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-black">
                                            {log.eventType}
                                        </p>

                                        <span
                                            className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                                                log.status === "SUCCESS"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {log.status === "SUCCESS"
                                                ? "Berhasil"
                                                : "Gagal"}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-[13px] text-slate-600">
                                        {log.description}
                                    </p>

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        {formatInTimezone(
                                            log.createdAt,
                                            timezone
                                        )}
                                        {log.actor ? ` • ${log.actor}` : ""}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-300 px-5 py-3">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1 || loading}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Sebelumnya
                    </button>

                    <p className="text-[12px] text-slate-600">
                        Halaman {page} dari {totalPages || 1}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setPage((p) => Math.min(totalPages || 1, p + 1))
                        }
                        disabled={page >= (totalPages || 1) || loading}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Berikutnya
                    </button>
                </div>
            </div>
        </div>
    );
}
