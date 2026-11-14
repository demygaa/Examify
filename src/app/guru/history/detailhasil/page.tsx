"use client";

import {
    Users,
    Calculator,
    TrendingUp,
    TrendingDown,
    BadgeCheck,
    Timer,
    FileDown,
    FileSpreadsheet,
    MoreHorizontal,
} from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "124",
        label: "Total",
        subLabel: "Peserta",
        iconColor: "text-blue-600",
    },
    {
        icon: Calculator,
        value: "78.5",
        label: "Rata-rata",
        subLabel: "Nilai",
        iconColor: "text-blue-600",
    },
    {
        icon: TrendingUp,
        value: "100",
        label: "Nilai",
        subLabel: "Tertinggi",
        iconColor: "text-green-500",
    },
    {
        icon: TrendingDown,
        value: "42",
        label: "Nilai",
        subLabel: "Terendah",
        iconColor: "text-red-500",
    },
    {
        icon: BadgeCheck,
        value: "88%",
        label: "Tingkat",
        subLabel: "Kelulusan",
        iconColor: "text-blue-600",
    },
    {
        icon: Timer,
        value: "65 m",
        label: "Rata-rata",
        subLabel: "Durasi",
        iconColor: "text-blue-600",
    },
];

export default function RiwayatUjianPage() {
    return (
        <div className="min-h-screen w-full min-w-0 bg-[#F7F8FC] px-3 py-4 sm:px-6 sm:py-5 rounded-xl">

            {/* HEADER */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-sm font-medium text-slate-800">
                            Detail Riwayat Ujian
                        </h1>

                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Selesai
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                        Lihat hasil dan analisis setelah ujian selesai.
                    </p>
                </div>

                {/* EXPORT */}
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2  whitespace-nowrap rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                        <FileDown size={15} />
                        Export PDF
                    </button>

                    <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                        <FileSpreadsheet size={15} />
                        Export Excel
                    </button>
                </div>
            </div>

            {/* DETAIL UJIAN */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm">

                <InfoItem
                    title="NAMA UJIAN"
                    value={
                        <>
                            UTS Matematika Semester
                            <br />
                            Ganjil
                        </>
                    }
                />

                <InfoItem
                    title="MATA PELAJARAN"
                    value="Matematika"
                />

                <InfoItem
                    title="KELAS"
                    value="X RPL 1 & 2"
                />

                <InfoItem
                    title="PELAKSANAAN"
                    value="24 Mei 2024 (90 Menit)"
                />
            </div>

            {/* STATISTICS */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={index}
                            className="min-h-[100px] rounded-xl border border-slate-300 bg-white px-4 py-4"
                        >
                            <Icon
                                size={17}
                                className={stat.iconColor}
                            />

                            <div className="mt-2 text-sm text-slate-800">
                                {stat.value}
                            </div>

                            <div className="text-xs text-slate-500">
                                {stat.label}
                            </div>

                            <div className="text-xs text-slate-500">
                                {stat.subLabel}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* TAB */}
            <div className="mt-7 border-b border-slate-300">
                <div className="flex gap-7">
                    <button className="relative pb-3 text-xs font-semibold text-blue-600">
                        Ringkasan

                        <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-blue-600" />
                    </button>

                    <button className="pb-3 text-xs font-medium text-slate-600">
                        Peserta (124)
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">

                {/* DISTRIBUSI NILAI */}
                <div className="min-h-[350px] rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xs font-medium text-slate-800">
                                Distribusi Nilai
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Sebaran nilai peserta ujian dalam rentang 10 poin.
                            </p>
                        </div>

                        <button className="rounded-lg p-1 text-slate-600 hover:bg-slate-100">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    {/* AREA CHART */}
                    <div className="mt-8 flex h-[250px] items-end justify-center">
                        <div className="flex h-full w-full items-end gap-3 px-5">

                            {[30, 45, 60, 75, 90, 70, 50, 35, 20].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-1 items-end"
                                    >
                                        <div
                                            className="w-full rounded-t-md bg-blue-100"
                                            style={{
                                                height: `${height}%`,
                                            }}
                                        />
                                    </div>
                                )
                            )}

                        </div>
                    </div>
                </div>

                {/* KELULUSAN */}
                <div className="min-h-[350px] rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <h2 className="text-xs font-medium text-slate-800">
                        Kelulusan
                    </h2>

                    {/* DONUT PLACEHOLDER */}
                    <div className="flex h-[270px] items-center justify-center">
                        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[22px] border-blue-100">
                            <div className="absolute inset-[-22px] rounded-full border-[22px] border-transparent border-t-blue-600 border-r-blue-600 rotate-[-35deg]" />

                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-800">
                                    88%
                                </p>
                                <p className="text-xs text-slate-500">
                                    Lulus
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-5 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                            <span className="text-slate-500">
                                Lulus
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-100" />
                            <span className="text-slate-500">
                                Tidak Lulus
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* =========================
   INFO ITEM
========================= */

function InfoItem({
    title,
    value,
}: {
    title: string;
    value: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-[11px] font-medium tracking-wide text-slate-500">
                {title}
            </p>

            <p className="mt-2 text-xs font-semibold leading-5 text-slate-800">
                {value}
            </p>
        </div>
    );
}