"use client";

import { useEffect, useState } from "react";
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import HeaderReportTable from "@/src/components/admin/kelolalaporan/HeaderReportTable";
import {
    CheckCircle2,
    ClipboardClock,
    ClipboardList,
    Loader,
} from "lucide-react";
import TableReports, { Reports } from "@/src/components/admin/kelolalaporan/TableReporst";
import ClassPagination from "@/src/components/admin/masterdata/PageNationClass";

const PAGE_SIZE = 10;

type StatusFilter = "all" | "Pending" | "Proses" | "Selesai";

const statusApiMap: Record<StatusFilter, string> = {
    all: "all",
    Pending: "PENDING",
    Proses: "PROSES",
    Selesai: "SELESAI",
};

export default function KelolaLaporan() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [reports, setReports] = useState<Reports[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);

    // Muat data saat parameter berubah atau saat tombol refresh ditekan.
    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(
                    `/api/admin/laporan?page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(search)}&status=${statusApiMap[statusFilter]}`,
                    { cache: "no-store" }
                );
                const json = await res.json();

                if (cancelled) return;

                if (!res.ok || !json.success) {
                    throw new Error(
                        json.message ?? "Gagal mengambil data laporan"
                    );
                }

                setReports(json.data);
                setTotalPages(json.totalPages ?? 1);
                setTotalItems(json.total ?? 0);
                setError("");
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

        void fetchData();

        return () => {
            cancelled = true;
        };
    }, [page, search, statusFilter, refreshKey]);

    const handleRefresh = () => {
        setRefreshKey((key) => key + 1);
    };

    const totalPending = reports.filter((r) => r.status === "Pending").length;
    const totalProses = reports.filter((r) => r.status === "Proses").length;
    const totalSelesai = reports.filter((r) => r.status === "Selesai").length;

    return (
        <div className="flex flex-col gap-[20px]">
            <HeaderAdmmin
                title="Kelola Laporan User"
                sec="Riview dan kelola laporan user"
            />
            <div className="flex flex-row gap-[20px]">
                <StatisticCarDashboardAdmin
                    title="TOTAL LAPORAN"
                    icon={ClipboardList}
                    value={String(totalItems)}
                />
                <StatisticCarDashboardAdmin
                    title="PENDING"
                    icon={ClipboardClock}
                    value={String(totalPending)}
                />
                <StatisticCarDashboardAdmin
                    title="PROGRES"
                    icon={Loader}
                    value={String(totalProses)}
                />
                <StatisticCarDashboardAdmin
                    title="SELESAI"
                    icon={CheckCircle2}
                    value={String(totalSelesai)}
                />
            </div>
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm h-full">
                <HeaderReportTable
                    search={search}
                    onSearchChange={(value) => {
                        setSearch(value);
                        setPage(1);
                    }}
                    status={statusFilter}
                    onStatusChange={(value) => {
                        setStatusFilter(value);
                        setPage(1);
                    }}
                />
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="px-3 py-8 text-center text-sm text-slate-500">
                            Memuat data laporan...
                        </p>
                    ) : error ? (
                        <div className="px-3 py-8 text-center">
                            <p className="text-sm text-red-600">{error}</p>
                            <button
                                type="button"
                                onClick={handleRefresh}
                                className="mt-2 text-sm font-medium text-blue-700"
                            >
                                Coba lagi
                            </button>
                        </div>
                    ) : (
                        <TableReports
                            data={reports}
                            onChanged={handleRefresh}
                        />
                    )}
                </div>
                <ClassPagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                        setPage(p);
                    }}
                    totalItems={totalItems}
                    pageSize={PAGE_SIZE}
                />
            </div>
        </div>
    );
}
