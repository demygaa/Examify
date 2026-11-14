"use client";

import { Search, ChevronDown } from "lucide-react";

type ReportStatus = "all" | "Pending" | "Proses" | "Selesai";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    status: ReportStatus;
    onStatusChange: (value: ReportStatus) => void;
};

export default function HeaderReportTable({
    search,
    onSearchChange,
    status,
    onStatusChange,
}: Props) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-300 p-3 justify-between">
            <div className="relative w-[400px] flex rounded-xl">
                <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search by name, NIS, NIP..."
                    className="h-8 w-full rounded border border-slate-300 pl-8 pr-3 text-[15px] outline-none focus:border-blue-500"
                />
            </div>
            <div className="flex h-8 min-w-[110px] items-center justify-between gap-2 rounded border border-slate-300 px-3 text-[15px] rounded-xl">
                <span className="font-medium">Status</span>
                <select
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value as ReportStatus)
                    }
                    className="bg-transparent border-none text-[15px] text-slate-600 outline-none w-full cursor-pointer appearance-none"
                    aria-label="Filter status laporan"
                >
                    <option value="all">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Proses">Proses</option>
                    <option value="Selesai">Selesai</option>
                </select>
                <ChevronDown size={20} />
            </div>
        </div>
    );
}
