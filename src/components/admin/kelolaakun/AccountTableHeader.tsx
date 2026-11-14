"use client";

import { Search } from "lucide-react";

type StatusFilter = "all" | "Active" | "Inactive";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    status: StatusFilter;
    onStatusChange: (value: StatusFilter) => void;
    classValue: string;
    onClassChange: (value: string) => void;
    classOptions: string[];
};

export default function AccountTableHeader({
    search,
    onSearchChange,
    status,
    onStatusChange,
    classValue,
    onClassChange,
    classOptions,
}: Props) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-300 p-3">
            {/* Search */}
            <div className="relative flex-1">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        onSearchChange(e.target.value)
                    }
                    placeholder="Search by name, username, NIS, NIP..."
                    className="h-7 w-full rounded border border-slate-300 pl-8 pr-3 text-xs outline-none focus:border-blue-500"
                />
            </div>

            {/* Status */}
            <select
                value={status}
                onChange={(e) =>
                    onStatusChange(e.target.value as StatusFilter)
                }
                aria-label="Filter status"
                className="h-7 min-w-[90px] rounded border border-slate-300 px-2 text-xs outline-none focus:border-blue-500"
            >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>

            {/* Class */}
            <select
                value={classValue}
                onChange={(e) => onClassChange(e.target.value)}
                aria-label="Filter kelas"
                className="h-7 min-w-[90px] rounded border border-slate-300 px-2 text-xs outline-none focus:border-blue-500"
            >
                <option value="all">All Classes</option>
                {classOptions.map((kelas) => (
                    <option key={kelas} value={kelas}>
                        {kelas}
                    </option>
                ))}
            </select>
        </div>
    );
}
