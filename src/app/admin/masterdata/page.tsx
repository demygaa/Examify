"use client";
import { Ban, BookMarked, CheckCircle } from "lucide-react";
import { useState } from "react";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import Link from "next/link";
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import ClassPagination from "@/src/components/admin/masterdata/PageNationClass";
import ClassTable, { ClassData } from "@/src/components/admin/masterdata/TableClass";
import ClassTableHeader from "@/src/components/admin/masterdata/HeaderTableClass";
import HeaderTableMapel from "@/src/components/admin/masterdata/HeaderTableMapel";
import TableMapel from "@/src/components/admin/masterdata/TabelMapel";
export default function MasterDataPage() {
    const [activeTab, setActiveTab] = useState<"kelas" | "mapel">("kelas");

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const classes: ClassData[] = [
        {
            id: 1,
            name: "10-Science-A",
            room: "Room 101",
            grade: "Grade 10",
            major: "Natural Sciences",
            students: 34,
            status: "Active",         
            createdAt: "Aug 15, 2023",
        },
        {
            id: 2,
            name: "10-Science-B",
            room: "Room 102",
            grade: "Grade 10",
            major: "Natural Sciences",
            students: 32,
            status: "Active",
            createdAt: "Aug 15, 2023",
        },
        {
            id: 3,
            name: "11-Social-A",
            room: "Room 205",
            grade: "Grade 11",
            major: "Social Studies",
            students: 28,
            status: "Active",
            createdAt: "Aug 16, 2023",
        },
    ];

    return (
        <div>
            <div className="flex flex-row justify-between">
                <HeaderAdmmin
                    title="Master data"
                    sec="Kelola data dengan Examify secara mudah dan akurat"
                />

                <Link href={`/admin/${activeTab}`}
                    className="bg-blue-700 flex text-white font-semibold text-center text-[15px] items-center justify-center rounded-xl px-2 py-1"
                >
                    {activeTab == "kelas"
                        ? "Tambah Kelas"
                        : "Tambah Mapel"
                    }
                </Link>
            </div>
            <div className="border-b border-slate-300 flex flex-row gap-3 mt-[20px]">
                <button
                    onClick={() => setActiveTab("kelas")}
                    className={` font-medium mb-[10px] text-[17px] ${activeTab === "kelas"
                        ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                        : "text-slate-500"
                        }`}
                >
                    Kelas
                </button>
                <button
                    onClick={() => setActiveTab("mapel")}
                    className={` text-[17px] font-medium mb-[10px] ${activeTab === "mapel"
                        ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                        : "text-slate-500"
                        }`}
                >
                    Mata Pelajaran
                </button>
            </div>
            {activeTab == "kelas" && (
                <div className="mt-[20px]">
                    <div className="grid grid-cols-3 gap-[20px]">
                        <StatisticCarDashboardAdmin
                            title="STUDENT"
                            icon={BookMarked}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin
                            title="ACTIVE CLASS"
                            icon={CheckCircle}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin
                            title="INACTIVE CLASS"
                            icon={Ban}
                            value="1230"
                        />
                    </div>
                    <div className="rounded-xl border border-slate-300 bg-white shadow-sm mt-[20px]">

                        <ClassTableHeader
                            search={search}
                            onSearchChange={setSearch}
                        />

                        <ClassTable
                            data={classes}
                        />

                        <ClassPagination
                            currentPage={page}
                            totalPages={4}
                            onPageChange={setPage}
                        />

                    </div>
                </div>
            )}

            {activeTab == "mapel" && (
                <div className="mt-[20px] gap-[20px]">
                    <div className="grid grid-cols-3 gap-[20px]">
                        <StatisticCarDashboardAdmin
                            title="MAPEL"
                            icon={BookMarked}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin
                            title="ACTIVE MAPEL"
                            icon={CheckCircle}
                            value="1230"
                        />
                        <StatisticCarDashboardAdmin
                            title="INACTIVE MAPEL"
                            icon={Ban}
                            value="1230"
                        />
                    </div>
                    <div className="bg-white rounded-xl border border-slate-300 mt-[20px] shadow-sm">
                        <HeaderTableMapel 
                            search={search}
                            onSearchChange={setSearch}
                        />
                        <TableMapel />

                        <ClassPagination
                            currentPage={page}
                            totalPages={4}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}