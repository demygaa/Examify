"use client";

import { useState, useEffect, useCallback } from "react";
import { Ban, BookMarked, CheckCircle } from "lucide-react";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import CreateClass from "@/src/components/admin/masterdata/CreateClass";
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import ClassPagination from "@/src/components/admin/masterdata/PageNationClass";
import ClassTable, { ClassData } from "@/src/components/admin/masterdata/TableClass";
import ClassTableHeader from "@/src/components/admin/masterdata/HeaderTableClass";
import HeaderTableMapel, { MapelStatusFilter } from "@/src/components/admin/masterdata/HeaderTableMapel";
import TableMapel, { MapelData } from "@/src/components/admin/masterdata/TabelMapel";
import CreateMapel from "@/src/components/admin/masterdata/CreateMapel";

const PAGE_SIZE = 10;

export default function MasterDataPage() {
    const [activeTab, setActiveTab] = useState<"kelas" | "mapel">("kelas");
    const [showCreateClass, setFormClass] = useState(false);
    const [showCreateMapel, setShowCreateMapel] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<MapelStatusFilter>("all");
    const [tingkatFilter, setTingkatFilter] = useState("");
    const [jurusanFilter, setJurusanFilter] = useState("");
    const [editingClass, setEditingClass] = useState<ClassData | null>(null);
    const [editingMapel, setEditingMapel] = useState<MapelData | null>(null);


    const [classes, setClasses] = useState<ClassData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [mapelList, setMapelList] = useState<MapelData[]>([]);
    const [loadingMapel, setLoadingMapel] = useState(true);
    const [errorMapel, setErrorMapel] = useState("");

    const loadClasses = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/kelas", { cache: "no-store" });
            const result = await res.json();

            if (!res.ok || !result.success) {
                setError(result.message ?? "Gagal mengambil data kelas");
                return;
            }

            setError("");
            setClasses(result.data);
        } catch {
            setError("Terjadi kesalahan jaringan");
        } finally {
            setLoading(false);
        }
    }, []);

    // dijalankan sekali saat halaman pertama kali tampil
    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await fetch("/api/admin/kelas", {
                    cache: "no-store",
                });
                const result = await res.json();

                if (cancelled) return;

                if (!res.ok || !result.success) {
                    setError(
                        result.message ?? "Gagal mengambil data kelas"
                    );
                    return;
                }

                setError("");
                setClasses(result.data);
            } catch {
                if (!cancelled) {
                    setError("Terjadi kesalahan jaringan");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const loadMapel = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/mapel", { cache: "no-store" });
            const result = await res.json();

            if (!res.ok || !result.success) {
                setErrorMapel(result.message ?? "Gagal mengambil data mapel");
                return;
            }

            setErrorMapel("");
            setMapelList(result.data);
        } catch {
            setErrorMapel("Terjadi kesalahan jaringan");
        } finally {
            setLoadingMapel(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab !== "mapel") return;

        let cancelled = false;

        (async () => {
            try {
                const res = await fetch("/api/admin/mapel", {
                    cache: "no-store",
                });
                const result = await res.json();

                if (cancelled) return;

                if (!res.ok || !result.success) {
                    setErrorMapel(
                        result.message ?? "Gagal mengambil data mapel"
                    );
                    return;
                }

                setErrorMapel("");
                setMapelList(result.data);
            } catch {
                if (!cancelled) {
                    setErrorMapel("Terjadi kesalahan jaringan");
                }
            } finally {
                if (!cancelled) {
                    setLoadingMapel(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [activeTab]);

    
    const filtered = classes.filter((c) => {
        const matchesSearch = `${c.kodeKelas} ${c.jurusan} ${c.tingkat}`
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesTingkat =
            !tingkatFilter || c.tingkat === tingkatFilter;
        const matchesJurusan =
            !jurusanFilter || c.jurusan === jurusanFilter;

        return matchesSearch && matchesTingkat && matchesJurusan;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pageData = filtered.slice(
        (safePage - 1) * PAGE_SIZE,
        safePage * PAGE_SIZE
    );

    const tingkatOptions = Array.from(
        new Set(classes.map((c) => c.tingkat))
    ).sort((a, b) => a.localeCompare(b));

    const jurusanOptions = Array.from(
        new Set(classes.map((c) => c.jurusan))
    ).sort((a, b) => a.localeCompare(b));

    const totalKelas = classes.length;
    const totalSiswa = classes.reduce((sum, c) => sum + (Number(c.jumlahSiswa) || 0), 0);
    const totalJurusan = new Set(classes.map((c) => c.kodeJurusan)).size;

    const filteredMapel = mapelList.filter((m) => {
        const matchesSearch = `${m.kode} ${m.nama}`
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && m.isActive) ||
            (statusFilter === "inactive" && !m.isActive);

        return matchesSearch && matchesStatus;
    });

    const totalPagesMapel = Math.max(
        1,
        Math.ceil(filteredMapel.length / PAGE_SIZE)
    );
    const safePageMapel = Math.min(page, totalPagesMapel);
    const pageMapel = filteredMapel.slice(
        (safePageMapel - 1) * PAGE_SIZE,
        safePageMapel * PAGE_SIZE
    );

    const totalMapel = mapelList.length;
    const totalMapelAktif = mapelList.filter((m) => m.isActive).length;
    const totalMapelNonaktif = totalMapel - totalMapelAktif;

    function changeTab(tab: "kelas" | "mapel") {
        setActiveTab(tab);
        setSearch("");
        setStatusFilter("all");
        setTingkatFilter("");
        setJurusanFilter("");
        setEditingClass(null);
        setEditingMapel(null);
        setPage(1);
    }

    async function handleDeleteClass(item: ClassData) {
        if (!window.confirm(`Hapus kelas ${item.kodeKelas}?`)) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/kelas/${item.id}`, {
                method: "DELETE",
            });
            const result = await res.json();

            if (!res.ok || !result.success) {
                window.alert(result.message ?? "Gagal menghapus data kelas");
                return;
            }

            await loadClasses();
        } catch {
            window.alert("Terjadi kesalahan jaringan");
        }
    }

    async function handleToggleMapelStatus(item: MapelData) {
        const nextActive = !item.isActive;

        if (
            !window.confirm(
                nextActive
                    ? `Aktifkan kembali mapel ${item.kode}?`
                    : `Nonaktifkan mapel ${item.kode}?`
            )
        ) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/mapel/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: nextActive }),
            });
            const result = await res.json();

            if (!res.ok || !result.success) {
                window.alert(
                    result.message ?? "Gagal mengubah status mapel"
                );
                return;
            }

            await loadMapel();
        } catch {
            window.alert("Terjadi kesalahan jaringan");
        }
    }

    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <HeaderAdmmin
                    title="Master data"
                    sec="Kelola data dengan Examify secara mudah dan akurat"
                />

                <button
                    type="button"
                    onClick={() => {
                        if (activeTab === "kelas") {
                            setEditingClass(null);
                            setFormClass(true);
                        } else {
                            setEditingMapel(null);
                            setShowCreateMapel(true);
                        }
                    }}
                    className="w-fit shrink-0 whitespace-nowrap bg-blue-700 flex text-white font-semibold text-[15px] items-center justify-center rounded-xl px-3 py-2 hover:bg-blue-800 transition"
                >
                    {activeTab === "kelas" ? "Tambah Kelas" : "Tambah Mapel"}
                </button>
            </div>

            <div className="border-b border-slate-300 flex flex-row gap-3 mt-[20px]">
                <button
                    onClick={() => changeTab("kelas")}
                    className={`font-medium mb-[10px] text-[17px] ${
                        activeTab === "kelas"
                            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                            : "text-slate-500"
                    }`}
                >
                    Kelas
                </button>
                <button
                    onClick={() => changeTab("mapel")}
                    className={`text-[17px] font-medium mb-[10px] ${
                        activeTab === "mapel"
                            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                            : "text-slate-500"
                    }`}
                >
                    Mata Pelajaran
                </button>
            </div>

           
            {activeTab === "kelas" && (
                <div className="mt-[20px]">
                    <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-3 sm:gap-[20px]">
                        <StatisticCarDashboardAdmin
                            title="TOTAL KELAS"
                            icon={BookMarked}
                            value={String(totalKelas)}
                        />
                         <StatisticCarDashboardAdmin
                            title="TOTAL SISWA"
                            icon={CheckCircle}
                            value={String(totalSiswa)}
                        />
                        <StatisticCarDashboardAdmin
                            title="TOTAL JURUSAN"
                            icon={Ban}
                            value={String(totalJurusan)}
                        /> 
                    </div>

                    <div className="min-w-0 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm mt-[20px]">
                        <ClassTableHeader
                            search={search}
                            onSearchChange={(value) => {
                                setSearch(value);
                                setPage(1); 
                            }}
                            tingkat={tingkatFilter}
                            onTingkatChange={(value) => {
                                setTingkatFilter(value);
                                setPage(1);
                            }}
                            jurusan={jurusanFilter}
                            onJurusanChange={(value) => {
                                setJurusanFilter(value);
                                setPage(1);
                            }}
                            tingkatOptions={tingkatOptions}
                            jurusanOptions={jurusanOptions}
                            onReset={() => {
                                setSearch("");
                                setTingkatFilter("");
                                setJurusanFilter("");
                                setPage(1);
                            }}
                        />

                        <div className="overflow-x-auto">
                            {loading ? (
                                <p className="px-3 py-8 text-center text-sm text-slate-500">
                                    Memuat data...
                                </p>
                            ) : error ? (
                                <div className="px-3 py-8 text-center">
                                    <p className="text-sm text-red-600">{error}</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoading(true);
                                            loadClasses();
                                        }}
                                        className="mt-2 text-sm font-medium text-blue-700"
                                    >
                                        Coba lagi
                                    </button>
                                </div>
                            ) : (
                                <ClassTable
                                    data={pageData}
                                    onEdit={(item) => {
                                        setEditingClass(item);
                                        setFormClass(true);
                                    }}
                                    onDelete={handleDeleteClass}
                                />
                            )}
                        </div>

                        <ClassPagination
                            currentPage={safePage}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            totalItems={filtered.length}
                            pageSize={PAGE_SIZE}
                        />
                    </div>
                </div>
            )}

            {/* ================= TAB MAPEL ================= */}
            {activeTab === "mapel" && (
                <div className="mt-[20px] gap-[20px]">
                    <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-3 sm:gap-[20px]">
                        <StatisticCarDashboardAdmin title="MAPEL" icon={BookMarked} value={String(totalMapel)} />
                        <StatisticCarDashboardAdmin title="ACTIVE MAPEL" icon={CheckCircle} value={String(totalMapelAktif)} />
                        <StatisticCarDashboardAdmin title="INACTIVE MAPEL" icon={Ban} value={String(totalMapelNonaktif)} />
                    </div>

                    <div className="min-w-0 overflow-hidden bg-white rounded-xl border border-slate-300 mt-[20px] shadow-sm">
                        <HeaderTableMapel
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
                            onReset={() => {
                                setSearch("");
                                setStatusFilter("all");
                                setPage(1);
                            }}
                        />
                        <div className="overflow-x-auto">
                            {loadingMapel ? (
                                <p className="px-3 py-8 text-center text-sm text-slate-500">
                                    Memuat data...
                                </p>
                            ) : errorMapel ? (
                                <div className="px-3 py-8 text-center">
                                    <p className="text-sm text-red-600">{errorMapel}</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoadingMapel(true);
                                            loadMapel();
                                        }}
                                        className="mt-2 text-sm font-medium text-blue-700"
                                    >
                                        Coba lagi
                                    </button>
                                </div>
                            ) : (
                                <TableMapel
                                    data={pageMapel}
                                    onEdit={(item) => {
                                        setEditingMapel(item);
                                        setShowCreateMapel(true);
                                    }}
                                    onToggleStatus={handleToggleMapelStatus}
                                />
                            )}
                        </div>
                        <ClassPagination
                            currentPage={safePageMapel}
                            totalPages={totalPagesMapel}
                            onPageChange={setPage}
                            totalItems={filteredMapel.length}
                            pageSize={PAGE_SIZE}
                        />
                    </div>
                </div>
            )};

            {showCreateClass && (
                <CreateClass
                    key={editingClass?.id ?? "create"}
                    initial={editingClass ?? undefined}
                    onClose={() => {
                        setFormClass(false);
                        setEditingClass(null);
                    }}
                    onCreated={loadClasses}
                />
            )}

            {showCreateMapel && (
                <CreateMapel
                    key={editingMapel?.id ?? "create"}
                    initial={editingMapel ?? undefined}
                    onClose={() => {
                        setShowCreateMapel(false);
                        setEditingMapel(null);
                    }}
                    onCreated={loadMapel}
                />
            )}
        </div>
    );
}