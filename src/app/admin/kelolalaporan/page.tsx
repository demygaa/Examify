"use client"
import StatisticCarDashboardAdmin from "@/src/components/admin/dashboard/StatisticDashboardAdmin";
import HeaderAdmmin from "@/src/components/admin/HeaderAdmin";
import { useState } from "react";
import HeaderReportTable from "@/src/components/admin/kelolalaporan/HeaderReportTable";
import { CheckCircle2, ClipboardClock, ClipboardList, Loader, Table } from "lucide-react";
import TableReports from "@/src/components/admin/kelolalaporan/TableReporst";
import ClassPagination from "@/src/components/admin/masterdata/PageNationClass";

export default function KelolaLaporan() {

    const [search, setSearch] = useState("");
     const [page, setPage] = useState(1);

    const reports = [
        {
            id: 1,
            laporan: "Akun saya dihekk masss",
            dikirim: "Mas Tajis",
            terkirim: "23-03-2004",
            status: "Pending",
            role: "Siswa",
            kategori: "Akun"

        },
        {
            id: 2,
            laporan: "Akun saya dihekk masss",
            dikirim: "Mas Tajis",
            terkirim: "23-03-2004",
            status: "Proses",
            role: "Guru",
           
            kategori: "Akun"
        },
        {
            id: 3,
            laporan: "Akun saya dihekk masss",
            dikirim: "Mas Tajis",
            terkirim: "23-03-2004",
            status: "Selesai",
            role: "Admin",
            kategori: "Akun"
        },
    ]

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
                    value="1230"
                />
                <StatisticCarDashboardAdmin
                    title="PENDING"
                    icon={ClipboardClock}
                    value="1230"
                />
                <StatisticCarDashboardAdmin
                    title="PROGRES"
                    icon={Loader}
                    value="1230"
                />
                <StatisticCarDashboardAdmin
                    title="SELESAI"
                    icon={CheckCircle2}
                    value="1230"
                />
            </div>
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm h-full">
                <HeaderReportTable
                    search={search}
                    onSearchChange={setSearch}
                />
                <TableReports data={reports}/>
                <ClassPagination
                    currentPage={page}
                    totalPages={4}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}